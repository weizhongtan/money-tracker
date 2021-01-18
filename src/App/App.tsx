import 'antd/dist/antd.css';

import {
  BarsOutlined,
  ClockCircleOutlined,
  FundOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Layout, Menu, Space, Spin } from 'antd';
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
import { useUrlState } from 'with-url-state';

import { Select } from '../components';
import { Scalars } from '../generated/graphql';
import { BaseDataContext, time } from '../lib';
import BreakdownView from '../pages/BreakdownView';
import CumulativeView from '../pages/CumulativeView';
import DateRangeSelect from '../pages/DateRangeSelect';
import ManageAccountsView from '../pages/ManageAccountsView';
import ManageCategoriesView from '../pages/ManageCategoriesView';
import TimelineView from '../pages/TimelineView';
import TransactionsView from '../pages/TransactionsView';
import theme from '../theme';
import { TimePeriod } from '../types';
import { useBaseData } from './data';

const Content = styled(Layout.Content)`
  background: #fff;
`;

const ViewWrapper = styled(Content)`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export type Filters = {
  accountIdFilter?: Scalars['uuid'];
  setAccountIdFilter: (id: Scalars['uuid']) => void;
  categoryIdFilter?: Scalars['uuid'];
  setCategoryIdFilter: (id: Scalars['uuid']) => void;
};

interface IRoute {
  path: string;
  title: string;
  icon: React.ReactElement;
  Component?: React.FC<TimePeriod & Filters>;
  children?: {
    path: string;
    title: string;
    Component: React.FC<TimePeriod>;
  }[];
}

const routes: IRoute[] = [
  {
    path: '/transactions',
    title: 'Transactions',
    icon: <BarsOutlined />,
    Component: TransactionsView,
  },
  {
    path: '/cumulative',
    title: 'Cumulative',
    icon: <FundOutlined />,
    Component: CumulativeView,
  },
  {
    path: '/breakdown',
    title: 'Breakdown',
    icon: <PieChartOutlined />,
    Component: BreakdownView,
  },
  {
    path: '/timeline',
    title: 'Timeline',
    icon: <ClockCircleOutlined />,
    Component: TimelineView,
  },
  {
    path: '/manage',
    title: 'Manage',
    icon: <SettingOutlined />,
    children: [
      {
        path: '/categories',
        title: 'Categories',
        Component: ManageCategoriesView,
      },
      {
        path: '/accounts',
        title: 'Accounts',
        Component: ManageAccountsView,
      },
    ],
  },
];

function App() {
  const location = useLocation();
  const history = useHistory();

  const [urlState, setUrlState] = useUrlState(
    {
      startDate: time().subtract(1, 'year').startOf('year').toISOString(),
      endDate: time().toISOString(),
    },
    { history }
  );
  const startDate = time(urlState.startDate);
  const endDate = time(urlState.endDate);
  const setDates = ({ startDate, endDate }: TimePeriod) => {
    setUrlState({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  const defaultOpenKeys = [
    routes
      .filter(({ children }) => children)
      .find(({ children }) =>
        (children as any[]).some((child) =>
          location.pathname.includes(child.path)
        )
      )?.path,
  ].filter((x) => typeof x === 'string');

  const [openKeys, setOpenKeys] = useState<any[]>(defaultOpenKeys);
  const { loading, error, data } = useBaseData();

  const [accountIdFilter, setAccountIdFilter] = useState<Scalars['uuid']>();
  const [categoryIdFilter, setCategoryIdFilter] = useState<Scalars['uuid']>();

  if (error) return <>error</>;

  return (
    <BaseDataContext.Provider value={data}>
      <Spin spinning={loading} size="large" wrapperClassName="full-height">
        <Layout style={{ height: '100%' }}>
          <Layout.Header>
            <Space>
              <DateRangeSelect
                {...{
                  startDate,
                  endDate,
                  setDates,
                }}
              />
              <Select
                value={accountIdFilter ?? 'all'}
                onSelect={(val) =>
                  setAccountIdFilter(
                    val === 'all' ? undefined : (val as string)
                  )
                }
                showSearch
                optionFilterProp="label"
                allowClear
                onClear={() => {
                  setAccountIdFilter(undefined);
                }}
              >
                {data.accounts.map(({ id, name }) => (
                  <Select.Option
                    value={id as string}
                    key={id as string}
                    label={name}
                  >
                    {name}
                  </Select.Option>
                ))}
              </Select>
              <Select
                value={categoryIdFilter ?? 'all'}
                onSelect={(val) =>
                  setCategoryIdFilter(
                    val === 'all' ? undefined : (val as string)
                  )
                }
                showSearch
                optionFilterProp="label"
                allowClear
                onClear={() => {
                  setCategoryIdFilter(undefined);
                }}
              >
                {data.categories.map(({ id, name }) => (
                  <Select.Option
                    value={id as string}
                    key={id as string}
                    label={name}
                  >
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Layout.Header>
          <Layout>
            <Layout.Sider
              collapsible
              style={{
                overflow: 'auto',
                height: '100%',
                position: 'sticky',
                top: 64,
                left: 0,
              }}
            >
              <Menu
                theme="dark"
                selectedKeys={[location.pathname]}
                onSelect={({ key }) => {
                  history.push({
                    pathname: key as string,
                    search: location.search,
                  });
                }}
                openKeys={openKeys.map((x) => String(x))}
                onOpenChange={setOpenKeys}
                mode="inline"
              >
                {routes.map(({ path, title, icon, children }) => {
                  if (!children) {
                    return (
                      <Menu.Item key={path}>
                        {icon}
                        <span>{title}</span>
                      </Menu.Item>
                    );
                  }
                  return (
                    <Menu.SubMenu
                      key={path}
                      title={
                        <span>
                          {icon}
                          <span>{title}</span>
                        </span>
                      }
                    >
                      {children.map((child) => (
                        <Menu.Item key={path + child.path}>
                          <span>{child.title}</span>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                })}
              </Menu>
            </Layout.Sider>
            <ViewWrapper>
              <Switch>
                {routes.map(({ path, Component, children }) => (
                  <Route
                    key={path}
                    path={path}
                    render={({ match }) => {
                      if (!children) {
                        if (Component) {
                          return (
                            <Component
                              {...{
                                startDate,
                                endDate,
                                accountIdFilter,
                                setAccountIdFilter,
                                categoryIdFilter,
                                setCategoryIdFilter,
                              }}
                            />
                          );
                        } else {
                          throw Error('children or component not defined.');
                        }
                      }
                      return (
                        <>
                          {children.map(({ Component, path }) => {
                            return (
                              <Route
                                key={match.url + path}
                                path={match.url + path}
                                render={() => (
                                  <Component
                                    {...{
                                      startDate,
                                      endDate,
                                    }}
                                  />
                                )}
                              />
                            );
                          })}
                          {/* <Redirect to={match.url + children[0].path} /> */}
                        </>
                      );
                    }}
                  />
                ))}
                <Redirect
                  to={{ pathname: routes[0].path, search: location.search }}
                />
              </Switch>
            </ViewWrapper>
          </Layout>
        </Layout>
      </Spin>
    </BaseDataContext.Provider>
  );
}

const client = new ApolloClient({
  uri: 'http://localhost:3000/v1/graphql',
  cache: new InMemoryCache(),
});

function Wrapper() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default Wrapper;
