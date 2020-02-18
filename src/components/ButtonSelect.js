import { Button } from 'antd';
import React, { useState } from 'react';

import Select from './Select';

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
