import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import './Menu.css';

class Menubar extends Component {
  render() {
    return (
      <header>
        <div className="logo">Ginko</div>
        <div className="navbar">
          <ul>
            <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          </ul> 
        </div>       
      </header>

    );
  }
}

export default Menubar;