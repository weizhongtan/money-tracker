import { Avatar } from 'antd';
import React from 'react';

import { useTheme } from '../lib';

type Props = {
  name: string;
  colour: string;
};

const AccountAvatar: React.FC<Props> = ({ name, colour }) => {
  const theme = useTheme();
  return (
    <Avatar
      style={{
        background:
          theme.colors.presetPrimaryColors[colour] ??
          theme.colors.presetPrimaryColors.grey,
      }}
      size="small"
    >
      {name[0]}
    </Avatar>
  );
};

export default AccountAvatar;
