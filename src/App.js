import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import moment from 'moment';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';

import Navigation from './Navigation';
import Line from './pages/Line';
import Transactions from './pages/Transactions';
import Variables from './pages/Variables';
import Pie from './pages/Pie';
import Bar from './pages/Bar';

const { Header, Content } = Layout;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Main = styled(Content)`
  height: 100%;
  width: 100%;
`;

function App() {
  const [startDate, setStartDate] = useState(moment().subtract(1, 'months'));
  const [endDate, setEndDate] = useState(moment());

  return (
    <Wrapper>
      <Router>
        <Header>
          <Variables
            {...{
              startDate,
              setStartDate,
              endDate,
              setEndDate,
            }}
          />
        </Header>
        <Navigation>
          {({ location }) => (
            <Menu
              selectedKeys={location.pathname}
              onSelect={({ key }) => {
                location.pathname = `/${key}`;
              }}
              mode="horizontal"
            >
              <Menu.Item key="/transactions">
                <NavLink to="/transactions">Transactions</NavLink>
              </Menu.Item>
              <Menu.Item key="/line">
                <NavLink to="/line">Line</NavLink>
              </Menu.Item>
              <Menu.Item key="/pie">
                <NavLink to="/pie">Pie</NavLink>
              </Menu.Item>
              <Menu.Item key="/bar">
                <NavLink to="/bar">Bar</NavLink>
              </Menu.Item>
            </Menu>
          )}
        </Navigation>
        <Main attached="bottom">
          <Switch>
            <Route
              path="/transactions"
              exact
              render={() => (
                <Transactions
                  {...{
                    startDate,
                    endDate,
                  }}
                />
              )}
            />
            <Route
              path="/line"
              exact
              component={() => <Line {...{ startDate, endDate }} />}
            />
            <Route
              path="/pie"
              exact
              component={() => <Pie {...{ startDate, endDate }} />}
            />
            <Route
              path="/bar"
              exact
              component={() => <Bar {...{ startDate, endDate }} />}
            />
            <Redirect to="/transactions" />
          </Switch>
        </Main>
      </Router>
    </Wrapper>
  );
}

const client = new ApolloClient({
  uri: 'http://localhost:3000/v1/graphql',
});

function ApolloWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default ApolloWrapper;
