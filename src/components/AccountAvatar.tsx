import Avatar, { AvatarProps } from 'antd/lib/avatar';
import React from 'react';

import { useTheme } from '../lib';

type Props = AvatarProps & {
  name: string;
  colour: string;
};

const AccountAvatar: React.FC<Props> = ({ name, colour, ...props }) => {
  const theme = useTheme();
  return (
    <span>
      <Avatar
        style={{
          background:
            theme.colors.presetPrimaryColors[colour] ??
            theme.colors.presetPrimaryColors.grey,
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
