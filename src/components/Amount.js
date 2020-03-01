import styled from 'styled-components';

const Amount = styled.span`
  display: block;
  text-align: right;
  color: ${({ positive, theme }) =>
    positive ? theme.positive : theme.neutral};
`;

export default Amount;
