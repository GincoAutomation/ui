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

  // else show the tiles

  // return <button onClick={() => sendEvent({ type: 'stateChange', id: 'abc' })}>Test Event</button>;

  // const [houseConfig, setHouseConfig] = useState({
  //   rooms: {},
  //   devices: {},
  //   actions: {}
  // });

  // useEffect(() => {
  //   return function cleanup() {
  //     /* clearInterval(this.pollingTimer);
  //     this.ws.close(); */
  //   };
  // }, []); // eslint-disable-line

  const notifyEvent = event => {
    console.log(JSON.stringify(event));
    sendEvent(event);
  };
  const renderCards = () => {
    const testHome = config;
    var order = 1;
    const cards = [];
    //Rooms
    //const roomsArr = Object.values(Object.values(testHome)[0]);
    testHome.rooms.map(room => {
      const r = (
        <Item key={order}>
          <Room inputs={room.inputs} name={room.name} notifyEvent={event => notifyEvent(event)} state={state}></Room>
        </Item>
      );
      console.log('Rooms ordernumber= ' + order);
      cards.push(r);
      order++;
    });
    //Devices

    // const devArr = Object.values(Object.values(testHome)[1]);
    testHome.devices.map(device => {
      const d = (
        <Item key={order}>
          <Device
            inputs={device.inputs}
            name={device.name}
            roomName={device.room}
            type={device.type}
            notifyEvent={event => notifyEvent(event)}
            state={state}
          ></Device>
        </Item>
      );
      console.log('Devices ordernumber= ' + order);
      cards.push(d);
      order++;
    });
    /*
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
    */
    return cards;
  };
  if (isLoading) {
    return <p style={{ color: 'red' }}>Still loading initial data</p>;
  } else {
    return (
      <div>
        <Container>{renderCards()}</Container>
      </div>
    );
  }
}

export default Home;
