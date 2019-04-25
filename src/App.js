import React, { Component } from 'react';
import "react-table/react-table.css";
import CustomersList from './components/CustomersList';

class App extends Component {
  render() {
    return (
      <div className="App">

        <CustomersList />

      </div>
    );
  }
}

export default App;
