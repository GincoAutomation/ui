import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Rooms from '../../pages/Rooms/Rooms';
import Devices from '../../pages/Devices/Devices';
import Actions from '../../pages/Actions/Actions';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/" component={Rooms} />
        <Route path="/devices/" component={Devices} />
        <Route path="/Actions/" component={Actions} />
      </Switch>
    );
  }
}

export default Router;
