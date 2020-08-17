import Select from 'antd/lib/select';
import styled from 'styled-components';
export * from 'antd/lib/select';

export default styled(Select)`
  width: 300px;

  .dropdown .ul {
    max-height: unset !important;
  }
`;
