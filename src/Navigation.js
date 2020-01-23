import { withRouter } from 'react-router-dom';

const Navigation = ({ location, children }) => {
  return children({
    location,
  });
};

export default withRouter(Navigation);
