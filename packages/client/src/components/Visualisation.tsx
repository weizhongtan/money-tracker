import * as React from 'react';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
`;

const Visualisation: React.FC<{
  children(size: Size): React.ReactNode;
}> = ({ children }) => (
  <Wrapper>
    <AutoSizer>{children}</AutoSizer>
  </Wrapper>
);

export default Visualisation;
