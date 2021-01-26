import Avatar, { AvatarProps } from 'antd/lib/avatar';
import React from 'react';

import { useTheme } from '../lib';
import { Nullable } from '../types';

type Props = AvatarProps & {
  name: string;
  colour: Nullable<string>;
};

const AccountAvatar: React.FC<Props> = ({ name, colour, ...props }) => {
  const theme = useTheme();
  return (
    <span>
      <Avatar
        style={{
          background: colour
            ? theme.colors.presetPrimaryColors[colour]
            : theme.colors.presetPrimaryColors.grey,
        }}
        size="small"
        {...props}
      >
        {name[0]}
      </Avatar>
    </span>
  );
};

export default AccountAvatar;
