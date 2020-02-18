import { Button, notification } from 'antd';
import React from 'react';
import uuid from 'uuid/v4';

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
      isSub: !!cat.parentCategoryName,
    }));
  }
  get() {
    return this.categories;
  }
  getName(id) {
    return this.categories.find(({ id: _id }) => _id === id)?.fullName;
  }
}

export const BaseDataContext = React.createContext({});

export const reversible = ({ action, undo }) => async (...args) => {
  const actionMessage = await action(...args);
  const key = uuid();
  notification.success({
    key,
    message: actionMessage,
    description: (
      <Button
        icon="undo"
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
