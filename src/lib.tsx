import { UndoOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Account, Category } from './types';

export const toMoney = (amount: number | string, compact = true) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
    ...(compact ? { notation: 'compact' } : {}),
  }).format(Number(amount));

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

type BaseResult = {
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
};

export function reversible<ArgType, ResultType = BaseResult>({
  action,
  undo,
}: {
  action: (arg: ArgType) => Promise<ResultType & BaseResult>;
  undo: (
    result: ResultType & BaseResult,
    arg: ArgType
  ) => Promise<string> | void;
}) {
  return async (arg: ArgType) => {
    const result = await action(arg);
    // TODO: refactor to use object API in all cases
    const actionMessage = result.message || 'did the thing';
    const type = result.type ?? 'success';
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
            const undoMessage = await undo(result, arg);
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
}