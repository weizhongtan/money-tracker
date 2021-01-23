import * as React from 'react';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import styled from 'styled-components';

export { default as Select } from './Select';
export { default as Radio } from './Radio';
export { default as ButtonSelect } from './ButtonSelect';
export { default as Amount } from './Amount';
export { default as AccountAvatar } from './AccountAvatar';
export { default as DateDisplay } from './DateDisplay';
export { default as PageDrawer } from './PageDrawer';
export { default as DatePicker } from './DatePicker';

export const VisualisationControls = styled.div`
  flex: 0 1 auto;
`;

const Wrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
`;

export const Visualisation: React.FC<{
  children(size: Size): React.ReactNode;
}> = ({ children }) => (
  <Wrapper>
    <AutoSizer>{children}</AutoSizer>
  </Wrapper>
);
