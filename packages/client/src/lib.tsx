import useUrlStateInternal from '@ahooksjs/use-url-state';
import { UndoOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { v4 as uuid } from 'uuid';

import { BaseData } from './types';

export const toMoney = (amount: number | string | Date, compact = true) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
    ...(compact ? { notation: 'compact' } : {}),
  }).format(Number(amount));

export const toPercent = (amount: number) =>
  `${(Math.abs(amount) * 100).toFixed(2)}%`;

export const toLabelledValue = (
  label: React.ReactText,
  val: React.ReactText
) => (
  <>
    {label} | <strong>{val}</strong>
  </>
);

export const BaseDataContext = React.createContext<BaseData>({
  accounts: [],
  categories: [],
  references: {},
});

export const useBaseData = (): BaseData => useContext(BaseDataContext);

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

export { dayjs as time };

export const useIsMount = () => {
  const isMountRef = React.useRef(true);
  React.useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export const useUrlState = <InitialState extends {}>(
  initialState?: InitialState
) => {
  const [urlState, setUrlStateInternal] = useUrlStateInternal<InitialState>(
    initialState
  );

  function setUrlState(s: React.SetStateAction<Partial<InitialState>>) {
    return setUrlStateInternal(s);
  }

  // assume true and false should be parsed as boolean
  const parsedUrlState: { [key: string]: string | boolean } = {};
  Object.entries(urlState).forEach(([key, val]) => {
    if (val === 'true' || val === 'false') {
      parsedUrlState[key] = val === 'true';
    } else if (typeof val === 'string' || typeof val === 'boolean') {
      parsedUrlState[key] = val;
    }
  });

  return [parsedUrlState as InitialState, setUrlState] as const;
};

export const uuidArrayVariable = (ids: string[]) => `{${ids.join(',')}}`;
