import React, { Component } from 'react';
import './App.css';

import Switch from '../Switch/Switch'
import Light from '../Light/Light';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lights:{
        Blue: 0,
        Green: 0,
        Yellow: 0
      }
    }
  }
  componentDidMount() {
    this.pollingTimer = setInterval(() => this.fetchState(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.pollingTimer)
  }

  fetchState(){
    fetch(`/state`)
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(error => console.error('Error:', error));
  }

  handleButtonClick(id){
    var data = {
      type: 'buttonClicked',
      id
    };

    fetch(`/event`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="App">
        <h1>Home Automation</h1>
        <Switch label={"Button 1"} onClick={() => this.handleButtonClick("Button1")}/>
        <Switch label={"Button 2"} onClick={() => this.handleButtonClick("Button2")}/>
        <Switch label={"Button 3"} onClick={() => this.handleButtonClick("Button3")}/>
        <br/>
        <Light color="blue" isOn={!!this.state.lights.Blue}/>
        <Light color="green" isOn={!!this.state.lights.Green}/>
        <Light color="yellow" isOn={!!this.state.lights.Yellow}/>
      </div>
    );
  }
}

export default App;
