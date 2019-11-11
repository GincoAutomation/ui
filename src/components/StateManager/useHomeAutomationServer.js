import { useState, useEffect } from 'react';

let listeners = [];
let ws = null;
let state = {
  UIconfig: {
    rooms: {},
    devices: {},
    actions: {}
  },
  UIState: {}
};

const sendEvent = event => {
  if (!ws) return console.error('Websocket not open');
  console.log('ws send', event);
  ws.send(JSON.stringify(event));
};

const setState = newState => {
  state = { ...state, ...newState };
  listeners.forEach(listener => {
    listener(state);
  });
};

const openWebsocket = () => {
  // Fetch uiConfig and initial state
  fetchConfig();
  fetchState();
  // Open websocket
  ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`);
  ws.onopen = () => console.log('websocket connected');
  ws.onclose = () => console.log('websocket closed');
  ws.onmessage = message => {
    let event;
    try {
      event = JSON.parse(message.data);
      console.log('ws received', event);
    } catch (err) {
      console.log('ws received message is not a json: ', message.data);
    }
    if (event && event.type === 'stateChange') {
      // todo logica event van server integreren in state
      const newUIState = state.UiState;
      setState({ UIState: newUIState });
    }
  };
};

const fetchConfig = () => {
  fetch(`/API/homeconfig`)
    .then(res => res.json())
    .then(result => setState({ UIState: JSON.parse(result) }))
    .catch(error => console.error('Error:', error));
};

const fetchState = () => {
  fetch(`/API/uiState`)
    .then(res => res.json())
    .then(result => setState({ UIconfig: JSON.parse(result) }))
    .catch(error => console.error('Error:', error));
};

const useHomeAutomationServer = () => {
  const newListener = useState()[1];
  useEffect(() => {
    listeners.push(newListener);
    if (!ws) openWebsocket();
  }, [newListener]);
  return { ...state, sendEvent };
};

export default useHomeAutomationServer;
