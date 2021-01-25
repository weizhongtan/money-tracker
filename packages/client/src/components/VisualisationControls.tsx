import { Space } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 0 1 auto;
`;

const VisualisationControls: React.FC = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Space>{children}</Space>
    </Wrapper>
  );
};

export default VisualisationControls;
