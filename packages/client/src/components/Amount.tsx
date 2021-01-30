import * as React from 'react';
import styled from 'styled-components';

import { toMoney } from '../lib';

const Wrapper = styled.span`
  display: block;
  text-align: right;
  color: ${({ positive, theme }: { positive: boolean; theme: any }) =>
    positive ? theme.positive : theme.neutral};
`;

type Props = {
  value: number;
};

const Amount: React.FC<Props> = ({ value }) => {
  return <Wrapper positive={value > 0}>{toMoney(value, false)}</Wrapper>;
};

export default Amount;
