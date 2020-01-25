import 'antd/dist/antd.css';

import { ApolloProvider } from '@apollo/react-hooks';
import { Layout, Menu } from 'antd';
import ApolloClient from 'apollo-boost';
import moment from 'moment';
import React, { useState } from 'react';
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import Navigation from './Navigation';
import CategoryView from './pages/CategoryView';
import CumulativeView from './pages/CumulativeView';
import SpendingView from './pages/SpendingView';
import TransactionsView from './pages/TransactionsView';
import Variables from './pages/Variables';

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
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, 'year')
      .startOf('year')
  );
  const [endDate, setEndDate] = useState(moment());

  return (
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
      <Main>
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
              <Menu.Item key="/cumulative">
                <NavLink to="/cumulative">Cumulative</NavLink>
              </Menu.Item>
              <Menu.Item key="/categories">
                <NavLink to="/categories">Categories</NavLink>
              </Menu.Item>
              <Menu.Item key="/spending">
                <NavLink to="/spending">Spending</NavLink>
              </Menu.Item>
            </Menu>
          )}
        </Navigation>
        <Switch>
          <Route
            path="/transactions"
            render={() => <TransactionsView {...{ startDate, endDate }} />}
          />
          <Route
            path="/cumulative"
            component={() => <CumulativeView {...{ startDate, endDate }} />}
          />
          <Route
            path="/categories"
            component={() => <CategoryView {...{ startDate, endDate }} />}
          />
          <Route
            path="/spending"
            component={() => <SpendingView {...{ startDate, endDate }} />}
          />
          <Redirect to="/transactions" />
        </Switch>
      </Main>
    </Router>
  );
}

const client = new ApolloClient({
  uri: 'http://localhost:3000/v1/graphql',
});

const theme = {
  positive: '#52c41a',
  neutral: '#1890ff',
  negative: '#f5222d',
};

function Wrappers() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Wrapper>
    </ApolloProvider>
  );
}

export default Wrappers;
