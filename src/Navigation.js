import { withRouter } from 'react-router-dom';

const Navigation = ({ location, children }) =>
  children({
    location,
  });

export default withRouter(Navigation);
