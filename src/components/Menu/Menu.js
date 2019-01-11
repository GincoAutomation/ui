import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Menu.css';

class Menubar extends Component {
  render() {
    return (
      <header>
        <div className="logo">Ginko</div>
        <div className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul> 
        </div>       
      </header>

    );
  }
}

export default Menubar;