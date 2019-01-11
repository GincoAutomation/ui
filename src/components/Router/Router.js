import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from '../../pages/Home/Home';
import Users from '../../pages/Users/Users';
import About from '../../pages/About/About';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/" component={Users} />
        <Route path="/about/" component={About} />
      </Switch>
    );
  }
}

export default Router;