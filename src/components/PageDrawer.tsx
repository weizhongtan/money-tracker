import Drawer, { DrawerProps } from 'antd/lib/drawer';
import * as React from 'react';

const PageDrawer: React.FC<DrawerProps> = ({ children, ...props }) => {
  return (
    <Drawer
      placement="bottom"
      closable={false}
      height="75%"
      bodyStyle={{
        padding: '10px',
      }}
      push={false}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export default PageDrawer;
