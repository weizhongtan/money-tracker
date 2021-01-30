import 'antd/dist/antd.css';

import {
  BarChartOutlined,
  BarsOutlined,
  FundOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Layout, Menu, Space, Spin, Switch } from 'antd';
import React, { useState } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch as RouterSwitch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import DateRangeSelect from '../components/DateRangeSelect';
import Select, { SelectProps } from '../components/Select';
import { BaseDataContext, time, useUrlState } from '../lib';
import BreakdownView from '../pages/BreakdownView';
import CumulativeView from '../pages/CumulativeView';
import ManageAccountsView from '../pages/ManageAccountsView';
import ManageCategoriesView from '../pages/ManageCategoriesView';
import TimelineView from '../pages/TimelineView';
import TransactionsView from '../pages/TransactionsView';
import theme from '../theme';
import { Account, Category, TimePeriod, Transaction } from '../types';
import {
  createCatchAllAccount,
  createCatchAllCategory,
  useBaseData,
} from './data';

const Content = styled(Layout.Content)`
  background: #fff;
`;

const ViewWrapper = styled(Content)`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export type Filters = {
  accountIdFilter?: Account['id'];
  setAccountIdFilter?: (id: Account['id']) => void;
  categoryIdFilter?: Category['id'];
  setCategoryIdFilter?: (id: Category['id']) => void;
  showControls: boolean;
};

const accountsRoute = {
  path: '/accounts',
  title: 'Accounts',
  Component: ManageAccountsView,
};

const manageRoute = {
  path: '/manage',
  title: 'Manage',
  icon: <SettingOutlined />,
  children: [
    {
      path: '/categories',
      title: 'Categories',
      Component: ManageCategoriesView,
    },
    accountsRoute,
  ],
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
    icon: <BarChartOutlined />,
    Component: TimelineView,
  },
  manageRoute,
];

function App() {
  const location = useLocation();
  const history = useHistory();

  const [urlState, setUrlState] = useUrlState<{
    startDate: Transaction['date'];
    endDate: Transaction['date'];
    accountIdFilter?: Account['id'];
    categoryIdFilter?: Category['id'];
    collapsed: boolean;
    showControls: boolean;
  }>({
    startDate: time().subtract(1, 'year').startOf('year').toISOString(),
    endDate: time().toISOString(),
    accountIdFilter: undefined,
    categoryIdFilter: undefined,
    collapsed: false,
    showControls: false,
  });
  const startDate = time(urlState.startDate);
  const endDate = time(urlState.endDate);
  const setDates = ({ startDate, endDate }: TimePeriod) => {
    setUrlState({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  const {
    accountIdFilter,
    categoryIdFilter,
    collapsed,
    showControls,
  } = urlState;
  const setAccountIdFilter = (id?: Account['id']) => {
    setUrlState({ accountIdFilter: id });
  };
  const setCategoryIdFilter = (id?: Category['id']) => {
    setUrlState({ categoryIdFilter: id });
  };
  const setCollapsed = (val: boolean) => {
    setUrlState({ collapsed: val });
  };
  const setShowControls = (val: boolean) => {
    setUrlState({ showControls: val });
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

  if (error) return <>error</>;

  const accounts = data.accounts.length
    ? data.accounts
    : [createCatchAllAccount(accountIdFilter)];
  const categories = data.categories.length
    ? data.categories
    : [createCatchAllCategory(categoryIdFilter)];

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
              <Select<React.FC<SelectProps<string>>>
                value={accountIdFilter ?? createCatchAllAccount().id}
                onSelect={(val) =>
                  setAccountIdFilter(
                    val === createCatchAllAccount().id ? undefined : val
                  )
                }
                showSearch
                optionFilterProp="label"
                allowClear
                onClear={() => {
                  setAccountIdFilter(undefined);
                }}
              >
                {accounts.map(({ id, name }) => (
                  <Select.Option value={id} key={id} label={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
              <Select<React.FC<SelectProps<string>>>
                value={categoryIdFilter ?? createCatchAllCategory().id}
                onSelect={(val) =>
                  setCategoryIdFilter(
                    val === createCatchAllCategory().id ? undefined : val
                  )
                }
                showSearch
                optionFilterProp="label"
                allowClear
                onClear={() => {
                  setCategoryIdFilter(undefined);
                }}
              >
                {categories.map(({ id, name }) => (
                  <Select.Option value={id} key={id} label={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
              <Switch
                checked={showControls}
                onChange={(checked) => {
                  setShowControls(checked);
                }}
                checkedChildren="Hide controls"
                unCheckedChildren="Show controls"
              />
            </Space>
          </Layout.Header>
          <Layout>
            <Layout.Sider
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
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
                    pathname: String(key),
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
              <RouterSwitch>
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
                                showControls,
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
                  path="/callback"
                  to={{
                    pathname: manageRoute.path + accountsRoute.path,
                    search: location.search,
                  }}
                />
                <Redirect
                  to={{ pathname: routes[0].path, search: location.search }}
                />
              </RouterSwitch>
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
