import { Button as _Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import Select, { SelectProps, SelectValue } from './Select';

const Button = styled(_Button)`
  text-align: left;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface Props extends SelectProps<SelectValue> {
  buttonText?: string;
  buttonTextDefault: string;
}

const ButtonSelect: React.FC<Props> = ({
  buttonText,
  buttonTextDefault,
  children,
  onChange = () => {},
  size,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);
  if (isOpen) {
    return (
      <Select
        onChange={(...args) => {
          onChange(...args);
          setOpen(false);
        }}
        onBlur={() => setOpen(false)}
        autoFocus
        size={size}
        {...props}
      >
        {children}
      </Select>
    );
  }
  return (
    <Button
      size={size}
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
