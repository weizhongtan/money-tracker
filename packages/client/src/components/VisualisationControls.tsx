import { Space } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 0 1 auto;
`;

type Props = {
  show?: boolean;
};

const VisualisationControls: React.FC<Props> = ({
  children,
  show = true,
  ...props
}) => {
  if (!show) {
    return null;
  }
  return (
    <Wrapper {...props}>
      <Space>{children}</Space>
    </Wrapper>
  );
};

export default VisualisationControls;
