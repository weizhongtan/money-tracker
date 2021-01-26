import _Button, { ButtonType } from 'antd/lib/button';
import React, { useState } from 'react';
import styled from 'styled-components';

import Select, { SelectProps } from './Select';

const Button = styled(_Button)`
  text-align: left;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface Props extends SelectProps<string> {
  buttonText: string;
  buttonType: ButtonType;
}

const ButtonSelect: React.FC<Props> = ({
  buttonText,
  buttonType,
  children,
  onChange = () => {},
  size,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);
  if (isOpen) {
    return (
      <Select<React.FC<SelectProps<string>>>
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
      type={buttonType}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonSelect;
