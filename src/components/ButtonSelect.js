import { Button as _Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import Select from './Select';

const Button = styled(_Button)`
  text-align: left;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ButtonSelect = ({
  buttonText,
  buttonTextDefault,
  children,
  onChange,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);
  if (isOpen) {
    return (
      <Select
        onChange={async (...args) => {
          await onChange(...args);
          setOpen(false);
        }}
        onBlur={() => setOpen(false)}
        autoFocus
        {...props}
      >
        {children}
      </Select>
    );
  }
  return (
    <Button
      size={props.size}
      onPointerEnter={() => {
        setOpen(true);
      }}
      type={buttonText ? 'dashed' : 'primary'}
    >
      {buttonText || buttonTextDefault}
    </Button>
  );
};

export default ButtonSelect;
