import React from 'react';
import './App.css';
import data from './private/data';

function App() {
  return (
    <div className="App">
      <table>
      {data.ope.map(transaction => (
        <tr>
          {Object.entries(transaction).map(([key, val]) => {
            return (
              <td>
                {val}
              </td>
            )
          })}
        </tr>
      ))}
      </table>
    </div>
  );
}

export default App;
