import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './Menu.css';
import styled from 'styled-components'


class Menubar extends Component {
  
  render() {
    return (
      <header>
       <img src="images/logo.png" alt="Logo" className="Logo"></img>
        <div className="navbar">
          <ul>
            <li><NavLink to="/" exact activeClassName="active">GINCO</NavLink></li>
            <li><NavLink to="/rooms" activeClassName="active">Rooms</NavLink></li>
            <li><NavLink to="/devices" activeClassName="active">Devices</NavLink></li>
            <li><NavLink to="/actions" activeClassName="active">Actions</NavLink></li>
          </ul> 
        </div>       
      </header>

    );
  }
}

export default Menubar;