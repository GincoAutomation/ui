import React, { Component } from 'react';
import { set } from 'lodash';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 300px;
  height: 100px;
`;
const Th = styled.th`
  &.left {
    background-color: #96fad5;
    border-top-left-radius: 10px;
    width: 90px;
  }
  &.rigth {
    background-color: #96fad5;
    border-top-right-radius: 10px;
  }
`;
const ButtonList = styled.ul`
  width: 290px;
  background-color: #e1faf1;
  list-style-type: none;
  padding-left: 10px;
  padding-top: 10px;
  margin: 0;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Li = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
`;
const Icon = styled.img`
  margin-right: 0px;
  margin-left: 0px;
  width: 90px;
`;
const P = styled.p`
  &.item {
    font-size: 25px;
    color: #26332e;
    float: left;
    margin-top: 0px;
    margin-left: 19px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  &.slider {
    font-size: 25px;
    color: #26332e;
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
class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderLables: new Map()
    };
  }
  getInputState(id, type) {
    if (type == 'toggle') {
      console.log(this.props.type);
      return this.props.state[id].checked;
    } else if (type == 'slider') {
      return this.props.state[id].value;
    }
  }
  /*
  notifyChangeToggle(id, count) {
    const changeInfo = {
      room: this.props.roomName,
      type: 'toggleEvent',
      UIName: this.props.name + this.props.toggles[id],
      value: !this.state.toggleState[id],
      UICount: count
    };
    this.props.notifyChange(changeInfo);
    var path = 'toggleState[' + id + ']';
    this.setState(state => set(state, path, !this.state.toggleState[id]));
  }
*/

  render() {
    const inputList = this.props.inputs.map((input, number) => {
      if (input.type == 'toggle') {
        return (
          <Li key={input.id}>
            <ToggleSwitch
              id={input.id}
              notifyEvent={event => this.props.notifyEvent(event)}
              style="device"
              state={this.getInputState(input.id, input.type)}
            />
            <P className="item">{input.name}</P>
          </Li>
        );
      }
      //TODO: implement slider input for devices
    });
    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <Th className="left">
                <Icon src={'images/' + this.props.type + '.png'} alt="Icon" className="Icon"></Icon>
              </Th>
              <Th className="rigth">
                <P className="roomName">{this.props.roomName}</P>
                <P className="type">{this.props.name}</P>
              </Th>
            </tr>
          </tbody>
        </Table>
        <ButtonList>{inputList}</ButtonList>
      </div>
    );
  }
}
Device.propTypes = {
  inputs: PropTypes.array,
  name: PropTypes.string,
  roomName: PropTypes.string,
  type: PropTypes.string,
  notifyEvent: PropTypes.func,
  state: PropTypes.object
};
export default Device;
