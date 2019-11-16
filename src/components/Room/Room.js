import React, { Component } from 'react';
//import { set } from 'lodash';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import RoomSlider from './RoomSlider.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//styling
const Table = styled.table`
  border-collapse: collapse;
  width: 300px;
`;
const Th = styled.th`
  &.left {
    background-color: #96a0fa;
    border-top-left-radius: 10px;
    width: 90px;
  }
  &.rigth {
    background-color: #96a0fa;
    border-top-right-radius: 10px;
  }
`;
const ButtonList = styled.ul`
  width: 290px;
  background-color: #e1e3fa;
  list-style-type: none;
  padding-left: 10px;
  padding-top: 10px;
  margin: 0;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Icon = styled.img`
  margin-right: 0px;
  margin-left: 0px;
  width: 70px;
`;
const Li = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
`;
const P = styled.p`
  &.item {
    font-size: 25px;
    color: #262833;
    float: left;
    margin-top: 0px;
    margin-left: 19px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  &.slider {
    font-size: 25px;
    color: #262833;
    float: left;
    margin-top: 0px;
    margin-right: 90px;
    margin-bottom: 10px;
  }
  &.debugState {
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    float: left;
    margin: 15px;
  }
  &.roomName {
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    font-weight: 400;
    text-align: left;
    margin-bottom: 0;
    margin-top: 5px;
  }
  &.type {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 100;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 20px;
  }
`;
//implementation
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderLables: new Map()
    };
  }

  // Change of toggle switch
  // notifyChangeToggle(id, count) {
  //   const changeInfo = {
  //     room: this.props.name,
  //     type: 'toggleEvent',
  //     UIName: this.props.toggles[id],
  //     value: !this.state.toggleState[id],
  //     UICount: count
  //   };
  //   this.props.notifyChange(changeInfo);
  //   var path = 'toggleState[' + id + ']';
  //   this.setState(state => set(state, path, !this.state.toggleState[id]));
  // }

  getInputState(id, type) {
    if (type == 'toggle') {
      return this.props.state[id].checked;
    } else if (type == 'slider') {
      return this.props.state[id].value;
    }
  }

  setLableSlider(id, value) {
    var sliderMap = new Map();
    sliderMap = this.state.sliderLables;
    sliderMap.set(id, value);
    this.setState({ sliderLables: sliderMap });
  }

  getLabelSlider(id) {
    //initialize the values from the state object
    if (this.state.sliderLables.get(id) == undefined) {
      var sliderMap = new Map();
      this.props.inputs.forEach(input => {
        if (input.type == 'slider') {
          sliderMap.set(input.id, this.props.state[id].value);
        }
      });
      this.setState({ sliderLables: sliderMap });
      return sliderMap.get(id);
    } else {
      return this.state.sliderLables.get(id);
    }
  }

  render() {
    const inputList = this.props.inputs.map((input, number) => {
      if (input.type == 'toggle') {
        return (
          <Li key={input.id}>
            <ToggleSwitch
              id={input.id}
              notifyEvent={event => this.props.notifyEvent(event)}
              style="room"
              state={this.getInputState(input.id, input.type)}
            />
            <P className="item">{input.name}</P>
          </Li>
        );
      } else if (input.type == 'slider') {
        return (
          <Li key={input.id}>
            <P className="slider">{input.name + ': ' + this.getLabelSlider(input.id)}</P>
            <RoomSlider
              id={input.id}
              updateLable={(id, value) => this.setLableSlider(id, value)}
              notifyEvent={event => this.props.notifyEvent(event)}
              state={this.getInputState(input.id, input.type)}
            />
          </Li>
        );
      }
    });
    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <Th className="left">
                <Icon src={'images/' + this.props.name + '.png'} alt="Icon" className="Icon"></Icon>
              </Th>
              <Th className="rigth">
                <P className="roomName">{this.props.name}</P>
                <P className="type">Leefruimte</P>
              </Th>
            </tr>
          </tbody>
        </Table>
        <ButtonList>{inputList}</ButtonList>
      </div>
    );
  }
}
Room.propTypes = {
  inputs: PropTypes.array,
  name: PropTypes.string,
  notifyEvent: PropTypes.func,
  state: PropTypes.object
};
export default Room;
