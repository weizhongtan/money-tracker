import 'antd/dist/antd.css';

import {
  BarsOutlined,
  ClockCircleOutlined,
  FundOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { Layout, Menu } from 'antd';
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
    Icon: <BarsOutlined />,
    component: TransactionsView,
  },
  {
    path: '/cumulative',
    title: 'Cumulative',
    Icon: <FundOutlined />,
    component: CumulativeView,
  },
  {
    path: '/breakdown',
    title: 'Breakdown',
    Icon: <PieChartOutlined />,
    component: BreakdownView,
  },
  {
    path: '/timeline',
    title: 'Timeline',
    Icon: <ClockCircleOutlined />,
    component: TimelineView,
  },
  {
    path: '/manage',
    title: 'Manage',
    Icon: <SettingOutlined />,
    children: [
      {
        path: '/categories',
        title: 'Categories',
        component: ManageView,
      },
    ],
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
      parentCategoryId: parent_category_id
      fullName: full_name
      type
    }
  }
`;

const useBaseData = () => {
  const { loading, error, data } = useQuery(GET_BASE_DATA);
  if (loading || error) {
    return {
      loading,
      error,
    };
  }

  return {
    data: {
      accounts: data.accounts,
      categories: data.categories.map(
        ({
          id,
          name,
          parentCategoryName,
          parentCategoryId,
          fullName,
          type,
        }) => ({
          id,
          name,
          parent: {
            name: parentCategoryName,
            id: parentCategoryId,
          },
          fullName,
          type,
        })
      ),
    },
  };
};

function App() {
  const location = useLocation();
  const history = useHistory();

  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, 'year')
      .startOf('year')
  );
  const [openKeys, setOpenKeys] = useState(
    [
      routes
        .filter(({ children }) => children)
        .find(({ children }) =>
          children.some(child => location.pathname.includes(child.path))
        )?.path,
    ].filter(x => x)
  );
  console.log(openKeys);
  const [endDate, setEndDate] = useState(moment());
  const { loading, error, data } = useBaseData();
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
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
            mode="inline"
          >
            {routes.map(({ path, title, Icon, children }) => {
              if (!children) {
                return (
                  <Menu.Item key={path}>
                    {Icon}
                    <span>{title}</span>
                  </Menu.Item>
                );
              }
              return (
                <Menu.SubMenu
                  key={path}
                  title={
                    <span>
                      {Icon}
                      <span>{title}</span>
                    </span>
                  }
                >
                  {children.map(child => (
                    <Menu.Item key={path + child.path}>
                      <span>{child.title}</span>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            })}
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
            {routes.map(({ path, component: Component, children }) => (
              <Route
                key={path}
                path={path}
                render={({ match }) => {
                  if (!children) {
                    return <Component {...{ startDate, endDate }} />;
                  }
                  return (
                    <>
                      {children.map(child => {
                        const Component = child.component;
                        return (
                          <Route
                            key={match.url + child.path}
                            path={match.url + child.path}
                            render={() => (
                              <Component {...{ startDate, endDate }} />
                            )}
                          />
                        );
                      })}
                      <Redirect to={match.url + children[0].path} />
                    </>
                  );
                }}
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
