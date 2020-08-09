import { UndoOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Account, Category } from './types';

export const toMoney = (amount: number, compact = true) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
    ...(compact ? { notation: 'compact' } : {}),
  }).format(amount);

export const toPercent = (amount: number) =>
  `${(Math.abs(amount) * 100).toFixed(2)}%`;

interface SuperCategory extends Category {
  isSub: boolean;
}

export class CategoriesList {
  categories: SuperCategory[];

  constructor(categories: Category[]) {
    this.categories = categories.map((cat) => ({
      ...cat,
      isSub: cat.name.includes(':'),
    }));
  }
  get() {
    return this.categories;
  }
  getFullName(id: string) {
    return this.categories.find(({ id: _id }) => _id === id)?.fullName;
  }
}

interface UserData {
  accounts: Account[];
  categories: Category[];
}

export const BaseDataContext = React.createContext<UserData>({
  accounts: [],
  categories: [],
});

export const useBaseData = (): UserData => useContext(BaseDataContext);

export const useTheme = () => useContext(ThemeContext);

interface Result {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const reversible = ({
  action,
  undo,
}: {
  action(...args: any): Promise<Result | string>;
  undo<T>(result: T, ...args: any): Promise<string> | void;
}) => async (...args: any) => {
  const result = await action(...args);
  // TODO: refactor to use object API in all cases
  const actionMessage =
    typeof result === 'string' ? result : result?.message || 'did the thing';
  const type = typeof result === 'string' ? 'success' : result?.type;
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
          const undoMessage = await undo(result, ...args);
          notification.success({
            key: uuid(),
            message: <>{undoMessage ?? 'undid the thing'}</>,
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
