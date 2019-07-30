import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import './Menu.css';

//Styling
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 118px;
  background: #0f1014;
  z-index: 1;
`;

const Navbar = styled.div`
  &.navbar {
    margin: 0px 100px 0 0;
  }
`;
/*
const Ul = styled.ul`
  &.menu {
    display: inline-block;
    list-style-type: none;
    margin: auto;
    padding: 0;
    overflow: hidden;
  }
`;
const Li = styled.li`
  &.menu {
    float: left;
    font-family: 'Roboto', sans-serif;
    font-size: 25px;
    a {
      display: block;
      color: #b8ccc5;
      text-align: center;
      padding: 0px 25px;
      line-height: 55px;
      text-decoration: none;
    }
    a:hover:not(.active) {
      color: #e1faf1;
    }
    .active {
      border-bottom: 4px solid #e1faf1;
      color: #e1faf1;
    }
  }
`;*/
const Logo = styled.img`
  height: 38px;
  margin-left: 18px;
  margin-top: 18px;
`;

class Menubar extends Component {
  render() {
    return (
      <Header>
        <Logo src="images/logo.png" alt="Logo"></Logo>
        <Navbar>
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                GINCO
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms" activeClassName="active">
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/devices" activeClassName="active">
                Devices
              </NavLink>
            </li>
            <li>
              <NavLink to="/actions" activeClassName="active">
                Actions
              </NavLink>
            </li>
          </ul>
        </Navbar>
      </Header>
    );
  }
}

export default Menubar;
