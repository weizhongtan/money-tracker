import Avatar, { AvatarProps } from 'antd/lib/avatar';
import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../lib';

const Wrapper = styled.span``;

type Props = AvatarProps & {
  name: string;
  colour: string;
  onClick?: () => void;
};

const AccountAvatar: React.FC<Props> = ({
  name,
  colour,
  onClick = () => {},
  ...props
}) => {
  const theme = useTheme();
  return (
    <Wrapper onClick={onClick}>
      <Avatar
        style={{
          background:
            theme.colors.presetPrimaryColors[colour] ??
            theme.colors.presetPrimaryColors.grey,
          cursor: 'pointer',
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
