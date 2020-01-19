import React, { useEffect } from 'react';
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

import ApolloClient, { gql } from 'apollo-boost';

import Navigation from './Navigation';
// import Graphs from './Graphs';
// import Transactions from './Transactions';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const Wrapper = styled.div`
  height: 100%;
`;

const Main = styled(Segment)`
  height: 100%;
  width: 100%;
`;

function App() {
  useEffect(() => {
    const get = async () => {
      const res = await client.query({
        query: gql`
          {
            allAccounts {
              nodes {
                rowId
              }
            }
          }
        `,
      });

      console.log(res);
    };
    get();
  });

  return (
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
            {/* <Route path="/transactions" exact component={Transactions} /> */}
            {/* <Route path="/graphs" exact component={Graphs} /> */}
            <Redirect to="/transactions" />
          </Switch>
        </Main>
      </Router>
    </Wrapper>
  );
}

export default App;
