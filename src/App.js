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

import Navigation from './Navigation';
import Graphs from './pages/Graphs';
import Transactions from './pages/Transactions';
import Criteria from './pages/Criteria';
import Pie from './pages/Pie';

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
  const [orderBy, setOrderBy] = useState('DATE_DESC');
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      searchText,
      orderBy,
    },
  });

  const transactions = data?.allTransactions.nodes.map(
    (
      {
        id,
        date,
        amount,
        accountByToAccountId,
        description,
        categoryByCategoryId,
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
      category: categoryByCategoryId?.name,
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
          <Criteria
            {...{
              totalCount: data?.allTransactions.totalCount,
              searchText,
              setSearchText,
              loading,
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
              <Menu.Item active={location.pathname === '/graphs'}>
                <NavLink to="/graphs">Graphs</NavLink>
              </Menu.Item>
              <Menu.Item active={location.pathname === '/pie'}>
                <NavLink to="/pie">Pie</NavLink>
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
                path="/graphs"
                exact
                component={() => <Graphs {...{ transactions }} />}
              />
              <Route
                path="/pie"
                exact
                component={() => <Pie {...{ transactions }} />}
              />
              <Redirect to="/transactions" />
            </Switch>
          </Main>
        )}
      </Router>
    </Wrapper>
  );
}

const client = new ApolloClient();

function ApolloWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default ApolloWrapper;
