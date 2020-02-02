import 'antd/dist/antd.css';

import * as colors from '@ant-design/colors';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { Layout, Menu } from 'antd';
import ApolloClient, { gql } from 'apollo-boost';
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

import { BaseDataContext } from './lib';
import Navigation from './Navigation';
import BreakdownView from './pages/BreakdownView';
import CumulativeView from './pages/CumulativeView';
import TimelineView from './pages/TimelineView';
import TransactionsView from './pages/TransactionsView';
import Variables from './pages/Variables';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  align-items: stretch;
  height: 100%;
  grid-template-rows: auto;
`;

const Header = styled(Layout.Header)`
  height: fit-content;
`;

const Content = styled(Layout.Content)`
  width: 100%;
`;

const routes = [
  { path: '/transactions', title: 'Transactions', component: TransactionsView },
  { path: '/cumulative', title: 'Cumulative', component: CumulativeView },
  { path: '/breakdown', title: 'Breakdown', component: BreakdownView },
  { path: '/timeline', title: 'Timeline', component: TimelineView },
];

const GET_BASE_DATA = gql`
  query GetBaseData {
    accounts(order_by: { legacy_key: asc }) {
      id
      name
    }
    categories: view_categories_with_parents(order_by: { full_name: asc }) {
      id
      name: full_name
    }
  }
`;

function App() {
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, 'year')
      .startOf('year')
  );
  const [endDate, setEndDate] = useState(moment());
  const { loading, error, data } = useQuery(GET_BASE_DATA);
  if (loading || error) return null;

  return (
    <Router>
      <BaseDataContext.Provider value={data}>
        <Header>
          <Variables
            {...{
              startDate,
              setStartDate,
              endDate,
              setEndDate,
            }}
          />
          <Navigation>
            {({ location }) => (
              <Menu
                selectedKeys={location.pathname}
                onSelect={({ key }) => {
                  location.pathname = `/${key}`;
                }}
                mode="horizontal"
              >
                {routes.map(({ path, title }) => (
                  <Menu.Item key={path}>
                    <NavLink to={path}>{title}</NavLink>
                  </Menu.Item>
                ))}
              </Menu>
            )}
          </Navigation>
        </Header>
        <Content>
          <Switch>
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                render={() => <Component {...{ startDate, endDate }} />}
              />
            ))}
            <Redirect to={routes[0].path} />
          </Switch>
        </Content>
      </BaseDataContext.Provider>
    </Router>
  );
}

const client = new ApolloClient({
  uri: 'http://localhost:3000/v1/graphql',
});

const theme = {
  positive: colors.green.primary,
  neutral: colors.blue.primary,
  negative: colors.red.primary,
  colors,
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
