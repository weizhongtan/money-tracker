import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Menu } from 'semantic-ui-react';

import Navigation from './Navigation';
import Graphs from './Graphs';
import Transactions from './Transactions';

function App() {
  return (
    <div className="App">
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
        <Segment attached="bottom">
          <Switch>
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/graphs" exact component={Graphs} />
            <Redirect to="/transactions" />
          </Switch>
        </Segment>
      </Router>
    </div>
  );
}

export default App;
