import 'antd/dist/antd.css';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { Icon, Layout, Menu } from 'antd';
import ApolloClient, { gql } from 'apollo-boost';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { BaseDataContext } from './lib';
import BreakdownView from './pages/BreakdownView';
import CumulativeView from './pages/CumulativeView';
import DateRangeSelect from './pages/DateRangeSelect';
import ManageView from './pages/ManageView';
import TimelineView from './pages/TimelineView';
import TransactionsView from './pages/TransactionsView';
import theme from './theme';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  align-items: stretch;
  height: 100%;
  grid-template-rows: auto;
`;

const Content = styled(Layout.Content)`
  width: 100%;
  background: #fff;
`;

const routes = [
  {
    path: '/transactions',
    title: 'Transactions',
    component: TransactionsView,
    Icon: <Icon type="bars" />,
  },
  {
    path: '/cumulative',
    title: 'Cumulative',
    component: CumulativeView,
    Icon: <Icon type="fund" />,
  },
  {
    path: '/breakdown',
    title: 'Breakdown',
    component: BreakdownView,
    Icon: <Icon type="pie-chart" />,
  },
  {
    path: '/timeline',
    title: 'Timeline',
    component: TimelineView,
    Icon: <Icon type="clock-circle" />,
  },
  {
    path: '/manage',
    title: 'Manage',
    component: ManageView,
    Icon: <Icon type="setting" />,
  },
];

const GET_BASE_DATA = gql`
  query GetBaseData {
    accounts(order_by: { legacy_key: asc }) {
      id
      name
    }
    categories: view_categories_with_parents(order_by: { full_name: asc }) {
      id
      name
      parentCategoryName: parent_category_name
      fullName: full_name
    }
  }
`;

function App() {
  const location = useLocation();
  const history = useHistory();

  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, 'year')
      .startOf('year')
  );
  const [endDate, setEndDate] = useState(moment());
  const { loading, error, data } = useQuery(GET_BASE_DATA);
  if (loading || error) return null;

  return (
    <BaseDataContext.Provider value={data}>
      <Layout hasSider>
        <Layout.Sider collapsible>
          <Menu
            theme="dark"
            selectedKeys={location.pathname}
            onSelect={({ key }) => {
              history.push(key);
            }}
            mode="inline"
          >
            {routes.map(({ path, title, Icon }) => (
              <Menu.Item key={path}>
                {Icon}
                <span>{title}</span>
              </Menu.Item>
            ))}
          </Menu>
          <DateRangeSelect
            {...{
              startDate,
              setStartDate,
              endDate,
              setEndDate,
            }}
          />
        </Layout.Sider>
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
      </Layout>
    </BaseDataContext.Provider>
  );
}

const client = new ApolloClient({
  uri: 'http://localhost:3000/v1/graphql',
});

function Wrappers() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </Wrapper>
    </ApolloProvider>
  );
}

export default Wrappers;
