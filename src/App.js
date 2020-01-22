import React, { useState } from 'react';
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
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import Navigation from './Navigation';
import Line from './pages/Line';
import Transactions from './pages/Transactions';
import Variables from './pages/Variables';
import Pie from './pages/Pie';
import Bar from './pages/Bar';

import { GET_TRANSACTIONS } from './data/transactions';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Main = styled(Segment)`
  height: 100%;
  width: 100%;
`;

function App() {
  const [searchText, setSearchText] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [startDate, setStartDate] = useState(
    moment('2017-01-01T00:00:00.000Z')
  );
  const [endDate, setEndDate] = useState(moment());
  const variables = {
    searchText: `%${searchText}%`,
    orderBy,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
  };

  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      searchText: variables.searchText,
      orderBy: variables.orderBy,
    },
  });

  const transactions = data?.transactions.map(
    (
      {
        id,
        date,
        amount,
        accountByToAccountId,
        description,
        category,
        accountByFromAccountId,
      },
      index
    ) => ({
      id: id,
      index,
      date: new Date(date),
      amount: Number(amount),
      account: accountByToAccountId?.name,
      description: description,
      category: category?.name,
      fromInternalAccount: accountByFromAccountId?.name,
    })
  );

  if (error) {
    return <p>something went wrong :(</p>;
  }

  return (
    <Wrapper>
      <Router>
        <Segment>
          <Variables
            {...{
              totalCount: data?.transactions_aggregate.aggregate.count,
              searchText,
              setSearchText,
              loading,
              startDate,
              setStartDate,
              endDate,
              setEndDate,
            }}
          />
        </Segment>
        <Navigation>
          {({ location }) => (
            <Menu tabular>
              <Menu.Item active={location.pathname === '/transactions'}>
                <NavLink exact to="/transactions">
                  Transactions
                </NavLink>
              </Menu.Item>
              <Menu.Item active={location.pathname === '/line'}>
                <NavLink to="/line">Line</NavLink>
              </Menu.Item>
              <Menu.Item active={location.pathname === '/pie'}>
                <NavLink to="/pie">Pie</NavLink>
              </Menu.Item>
              <Menu.Item active={location.pathname === '/bar'}>
                <NavLink to="/bar">Bar</NavLink>
              </Menu.Item>
            </Menu>
          )}
        </Navigation>
        {!loading && (
          <Main attached="bottom">
            <Switch>
              <Route
                path="/transactions"
                exact
                render={() => (
                  <Transactions
                    {...{
                      transactions,
                      orderBy,
                      setOrderBy,
                    }}
                  />
                )}
              />
              <Route
                path="/line"
                exact
                component={() => <Line {...{ transactions, variables }} />}
              />
              <Route
                path="/pie"
                exact
                component={() => <Pie {...{ transactions, variables }} />}
              />
              <Route
                path="/bar"
                exact
                component={() => <Bar {...{ transactions, variables }} />}
              />
              <Redirect to="/transactions" />
            </Switch>
          </Main>
        )}
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
