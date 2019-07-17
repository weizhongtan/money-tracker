import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Transactions from './Transactions';
import Graphs from './Graphs';
import { Menu } from 'semantic-ui-react';

function App() {
  const [activeItem, setActiveItem] = useState('transactions');
  return (
    <div className="App">
      <Router>
        <Menu>
          <Link
            to="/transactions"
            onClick={() => setActiveItem('transactions')}
          >
            <Menu.Item active={activeItem === 'transactions'}>
              Transactions
            </Menu.Item>
          </Link>
          <Link to="/graphs" onClick={() => setActiveItem('graphs')}>
            <Menu.Item active={activeItem === 'graphs'}>graphs</Menu.Item>
          </Link>
        </Menu>
        <Route path="/transactions" exact component={Transactions} />
        <Route path="/graphs" exact component={Graphs} />
        <Redirect to="/transactions" />
      </Router>
    </div>
  );
}

export default App;
