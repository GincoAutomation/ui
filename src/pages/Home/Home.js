import React from 'react';

import Room from '../../components/Room/Room';
import Device from '../../components/Device/Device';
import Action from '../../components/Action/Action';
//import testHome from '../../data/testHome';
import styled from 'styled-components';
import useHomeAutomationServer from '../../components/StateManager/useHomeAutomationServer';
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

function Home(props) {
  const { isLoading, config, state, sendEvent } = useHomeAutomationServer();
  console.log('isLoading', isLoading);
  console.log('config', config);
  console.log('state', state);
  // as long as initial config and state is not loaded yet, show a loading screen
  if (isLoading) return <p style={{ color: 'red' }}>Still loading initial data</p>;
  // else show the tiles
  return <button onClick={() => sendEvent({ type: 'stateChange', id: 'abc' })}>Test Event</button>;
  // const [houseConfig, setHouseConfig] = useState({
  //   rooms: {},
  //   devices: {},
  //   actions: {}
  // });

  // useEffect(() => {
  //   // Option 1) start a polling request to get the state
  //   // this.pollingTimer = setInterval(() => this.fetchState(), 1000);
  //   console.log('debugging object');
  //   console.log(houseConfig);
  //   fetchConfig();
  //   console.log('fetch executed');
  //   console.log(houseConfig);
  //   // Option 2) open a websocket and receive incremental state updates
  //   //TODO handle ws lifecycle management
  //   /* this.ws = new WebSocket(
  //     `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`
  //   );
  //   this.ws.onopen = () => console.log('websocket connected');
  //   this.ws.onclose = () => console.log('websocket closed');
  //   this.ws.onmessage = message => {
  //     let event;
  //     try {
  //       event = JSON.parse(message.data);
  //       console.log('ws received', event);
  //     } catch (err) {
  //       console.log('ws received message is not a json: ', message.data);
  //     }
  //     if (event && event.type === 'stateChange') {
  //       // this.setState(state => setWith(state, `${event.path}.${event.id}`, event.value, clone));
  //     }
  //   }; */

  //   return function cleanup() {
  //     /* clearInterval(this.pollingTimer);
  //     this.ws.close(); */
  //   };
  // }, []); // eslint-disable-line

  // const fetchState = () => {
  //   fetch(`/API/state`)
  //     .then(res => res.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.error('Error:', error));
  // };

  // const fetchConfig = () => {
  //   fetch(`/API/homeconfig`)
  //     .then(res => res.json())
  //     .then(result => setHouseConfig(JSON.parse(result)))
  //     .catch(error => console.error('Error:', error));
  // };

  // const postEvent = event => {
  //   fetch(`/API/event`, {
  //     method: 'POST', // or 'PUT'
  //     body: JSON.stringify(event), // data can be `string` or {object}!
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => this.setState(result))
  //     .catch(error => console.error('Error:', error));
  // };

  const notifyChange = changeInfo => {
    console.log(JSON.stringify(changeInfo));
    sendEvent(changeInfo);
  };
  const renderCards = () => {
    const testHome = config;
    var order = 1;
    const cards = [];
    //Rooms
    const roomsArr = Object.values(Object.values(testHome)[0]);
    roomsArr.map(room => {
      const r = (
        <Item key={order}>
          <Room toggles={room.toggles} name={room.name} notifyChange={changeInfo => notifyChange(changeInfo)}></Room>
        </Item>
      );
      console.log('Rooms ordernumber= ' + order);
      cards.push(r);
      order++;
    });
    //Devices
    const devArr = Object.values(Object.values(testHome)[1]);
    devArr.map(device => {
      const d = (
        <Item key={order}>
          <Device
            toggles={device.toggles}
            name={device.name}
            roomName={device.roomName}
            type={device.type}
            notifyChange={changeInfo => notifyChange(changeInfo)}
          ></Device>
        </Item>
      );
      console.log('Devices ordernumber= ' + order);
      cards.push(d);
      order++;
    });
    //Actions
    const actArr = Object.values(Object.values(testHome)[2]);
    actArr.map(action => {
      const a = (
        <Item key={order}>
          <Action
            name={action.name}
            subtext={action.subtext}
            notifyChange={changeInfo => notifyChange(changeInfo)}
          ></Action>
        </Item>
      );
      console.log('Actions ordernumber= ' + order);
      cards.push(a);
      order++;
    });
    return cards;
  };

  return (
    <div>
      <Container>{renderCards()}</Container>
    </div>
  );
}

export default Home;
