import { Tooltip } from 'antd';
import * as React from 'react';
import TimeAgo from 'react-timeago';

import { time } from '../lib';

type Props = {
  date: string | Date;
  asTimeAgo?: boolean;
};

const DateDisplay: React.FC<Props> = ({ date, asTimeAgo = false }) => {
  if (asTimeAgo) {
    return (
      <Tooltip title={time(date).format('DD/MM/YY')}>
        <span>
          <TimeAgo date={date} />
        </span>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={<TimeAgo date={date} />}>
      <span>{time(date).format('DD/MM/YY')}</span>
    </Tooltip>
  );
};

export default DateDisplay;
