import React, { Component } from 'react';
import './App.css';

import Switch from '../Switch/Switch'
import Light from '../Light/Light';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home Automation</h1>
        <Switch label={"Switch 1"} />
        <Switch label={"Switch 2"} />
        <Switch label={"Switch 3"} />
        <br/>
        <Light color="blue" isOn/>
        <Light color="yellow"/>
        <Light color="red"/>
      </div>
    );
  }
}

export default App;
