import React, { Component } from 'react';
import { clone, setWith } from 'lodash';
import Room from '../../components/Room/Room';
import Device from '../../components/Device/Device';
import Action from '../../components/Action/Action';


class Home extends Component {
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
    this.ws.onopen = () => console.log('websocket connected');
    this.ws.onclose = () => console.log('websocket closed');
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
    this.ws.close();
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
  notifyClick(name){
    console.log(name+" is clicked read from home")
  }
  render() {
    return (
      <div>
        <h1>Home Control</h1>
         <div>
       <Room toggles={["Verlichting","Verluchting"]} name="Living"></Room>
       <Device toggles={["Lamp","Lees"]} name="Staande lamp" roomName="Living" type="floor_lamp"></Device>
       <Device toggles={["Lamp"]} name="Hoofd Luster" roomName="Keuken" type="ceiling_light"></Device>
       <Action name="Movie" subtext="Film kijken" notifyClick={(name)=>this.notifyClick(name) }></Action>
        </div>
      </div>
    );
  }
}

export default Home;
