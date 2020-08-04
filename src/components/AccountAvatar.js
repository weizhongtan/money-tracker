import { Avatar } from 'antd';
import React from 'react';

import { useTheme } from '../lib';

const AccountAvatar = ({ name, colour }) => {
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
