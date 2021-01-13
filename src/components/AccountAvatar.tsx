import Avatar, { AvatarProps } from 'antd/lib/avatar';
import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../lib';

const Wrapper = styled.span``;

type Props = AvatarProps & {
  name: string;
  colour: string;
};

const AccountAvatar: React.FC<Props> = ({ name, colour, ...props }) => {
  const theme = useTheme();
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default AccountAvatar;
