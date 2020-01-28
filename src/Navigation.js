import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = ({ location, children }) => {
  return children({
    location,
  });
};

export default styled(withRouter(Navigation))``;
