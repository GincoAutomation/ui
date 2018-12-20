import React, { Component } from 'react';
import { clone, setWith } from 'lodash';

import './App.css';
import Switch from '../Switch/Switch'
import Light from '../Light/Light';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttons: {
        Button1: 0,
        Button2: 0,
        Button3: 0
      },
      lights: {
        Blue: 0,
        Green: 0,
        Yellow: 0  
      }
    }
  }
  componentDidMount() {
    // Option 1) start a polling request to get the state
    // this.pollingTimer = setInterval(() => this.fetchState(), 1000);

    // Option 2) open a websocket and receive incremental state updates
    this.fetchState();  // fetch the initial state
    //TODO handle ws lifecycle management
    this.ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`);
    this.ws.onopen = () => {
        console.log('websocket connected')
    }
    this.ws.onmessage = (message) => {
      let event;
      try {
        event = JSON.parse(message.data);
        console.log("ws received", event);
      } catch {
        console.log("ws received message is not a json: ", message.data)
      }
      if (event && event.type === 'stateChange'){
        this.setState((state) => setWith(state, `${event.path}.${event.id}`, event.value, clone))
      }
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.pollingTimer)
  }

  fetchState(){
    fetch(`/API/state`)
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(error => console.error('Error:', error));
  }

  handleButtonClick(id){
    var event = {
      type: 'buttonClicked',
      id
    };
    
    // Option 1) Post an event to the API
    // this.postEvent(event);

    // Option 2) Post an event to the websocket
    console.log("ws send", event); 
    this.ws.send(JSON.stringify(event));
  }

  postEvent(event){
    fetch(`/API/event`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(event), // data can be `string` or {object}!
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
