import { Tooltip } from 'antd';
import moment from 'moment';
import * as React from 'react';
import TimeAgo from 'react-timeago';

type Props = {
  date: Date;
  asTimeAgo?: boolean;
};

const DateDisplay = ({ date, asTimeAgo = false }: Props) => {
  if (asTimeAgo) {
    return (
      <Tooltip title={moment(date).format('DD/MM/YY')}>
        <span>
          <TimeAgo date={date} />
        </span>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={<TimeAgo date={date} />}>
      <span>{moment(date).format('DD/MM/YY')}</span>
    </Tooltip>
  );
};

export default DateDisplay;
