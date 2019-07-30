import React, { Component } from 'react';
import { clone, setWith } from 'lodash';
import Action from '../../components/Action/Action';
import testHome from '../../data/testHome';
import styled from 'styled-components';
//styles
const Container = styled.div`
  width:
  border: 1px  #ffffff solid;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, 300px);
  
  align-content: stretch;
  grid-auto-flow: dense;

`;
const Item = styled.div`
  justify-self: stretch;
`;

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.notifyChange = this.notifyChange.bind(this);
  }

  componentDidMount() {
    // Option 1) start a polling request to get the state
    // this.pollingTimer = setInterval(() => this.fetchState(), 1000);

    // Option 2) open a websocket and receive incremental state updates
    this.fetchState(); // fetch the initial state
    //TODO handle ws lifecycle management
    this.ws = new WebSocket(
      `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`
    );
    this.ws.onopen = () => console.log('websocket connected');
    this.ws.onclose = () => console.log('websocket closed');
    this.ws.onmessage = message => {
      let event;
      try {
        event = JSON.parse(message.data);
        console.log('ws received', event);
      } catch (err) {
        console.log('ws received message is not a json: ', message.data);
      }
      if (event && event.type === 'stateChange') {
        this.setState(state => setWith(state, `${event.path}.${event.id}`, event.value, clone));
      }
    };
  }

  componentWillUnmount() {
    clearInterval(this.pollingTimer);
    this.ws.close();
  }

  fetchState() {
    fetch(`/API/state`)
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(error => console.error('Error:', error));
  }

  handleButtonClick(id) {
    var event = {
      type: 'buttonClicked',
      id
    };

    // Option 1) Post an event to the API
    // this.postEvent(event);

    // Option 2) Post an event to the websocket
    console.log('ws send', event);
    this.ws.send(JSON.stringify(event));
  }

  postEvent(event) {
    fetch(`/API/event`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(event), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(error => console.error('Error:', error));
  }
  //implement changes to any of the UI elements
  notifyChange(changeInfo) {
    console.log(JSON.stringify(changeInfo));
  }
  render() {
    return (
      <div>
        <Container>
          {Object.entries(testHome.actions).map(([key, action]) => (
            <Item key={key}>
              <Action name={action.name} subtext={action.subtext} notifyChange={this.notifyChange}></Action>
            </Item>
          ))}
        </Container>
      </div>
    );
  }
}

export default Actions;
