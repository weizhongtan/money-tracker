import { UndoOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { v4 as uuid } from 'uuid';

export const toMoney = (number, compact = true) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
    ...(compact ? { notation: 'compact' } : {}),
  }).format(number);

export const toPercent = number => `${(Math.abs(number) * 100).toFixed(2)}%`;

export class CategoriesList {
  constructor(categories) {
    this.categories = categories.map(cat => ({
      ...cat,
      isSub: !!cat.parent?.name,
    }));
  }
  get() {
    return this.categories;
  }
  getFullName(id) {
    return this.categories.find(({ id: _id }) => _id === id)?.fullName;
  }
}

export const BaseDataContext = React.createContext({});

export const useBaseData = () => useContext(BaseDataContext);

export const useTheme = () => useContext(ThemeContext);

export const reversible = ({ action, undo }) => async (...args) => {
  const result = await action(...args);
  // TODO: refactor to use object API in all cases
  const actionMessage = result?.message || result || 'did the thing';
  const type = result?.type || 'success';
  const key = uuid();
  // see types: https://ant.design/components/notification/#API
  notification[type]({
    key,
    message: actionMessage,
    description: type === 'success' && (
      <Button
        icon={<UndoOutlined />}
        size="small"
        onClick={async () => {
          notification.close(key);
          const undoMessage = await undo(...args);
          notification.success({
            key: uuid(),
            message: undoMessage,
            placement: 'topLeft',
          });
        }}
      >
        Undo
      </Button>
    ),
    placement: 'topLeft',
  });
};
