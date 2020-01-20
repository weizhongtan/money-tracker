import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Navigation from './Navigation';
// import Graphs from './pages/Graphs';
import Transactions from './pages/Transactions';

const client = new ApolloClient();

const Wrapper = styled.div`
  height: 100%;
`;

const Main = styled(Segment)`
  height: 100%;
  width: 100%;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Router>
          <Navigation>
            {({ location }) => (
              <Menu tabular>
                <Menu.Item active={location.pathname === '/transactions'}>
                  <NavLink exact to="/transactions">
                    Transactions
                  </NavLink>
                </Menu.Item>
                <Menu.Item active={location.pathname === '/graphs'}>
                  <NavLink to="/graphs">Graphs</NavLink>
                </Menu.Item>
              </Menu>
            )}
          </Navigation>
          <Main attached="bottom">
            <Switch>
              <Route path="/transactions" exact component={Transactions} />
              {/* <Route path="/graphs" exact component={Graphs} /> */}
              <Redirect to="/transactions" />
            </Switch>
          </Main>
        </Router>
      </Wrapper>
    </ApolloProvider>
  );
}

export default App;
