import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Menu from '../Menu/Menu';
import Router from '../Router/Router';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Router />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
