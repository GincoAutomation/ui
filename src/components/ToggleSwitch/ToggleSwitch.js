import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from 'prop-types';

class ToggleSwitch extends Component {
  constructor(props){
    super(props);
    this.state= {
        checked:false,
        toggleCount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //calls notifyChange function on parent
  handleChange(checked) {
    this.setState({ checked,toggleCount: this.state.toggleCount+1 });
    this.props.notifyChangeToggle(this.props.id, this.state.toggleCount);
  }
  //return the right colors for button component
  getStyle(style){
    var colors={
      onColor: null,
      onHandleColor:null,
      offColor:null,
      offHandleColor:null,
    }
    //add style here 
    switch(style){
      case "room":
          colors={
            onColor:"#96a0fa",
            onHandleColor:"#1f2666",
            offColor:"#cccccc",
            offHandleColor:"#666666",
          };
          break;
      case "device":
          colors={
            onColor:"#96fad5",
            onHandleColor:"#1f664c",
            offColor:"#cccccc",
            offHandleColor:"#666666",
          };
          break;
    }
    return colors
  }
  render(){
    return(
      <label style={{float:'left'}} >
          <Switch checked={this.state.checked}
              onChange={this.handleChange}
              onColor= {this.getStyle(this.props.style).onColor}
              onHandleColor= {this.getStyle(this.props.style).onHandleColor}
              offColor={this.getStyle(this.props.style).offColor}
              offHandleColor={this.getStyle(this.props.style).offHandleColor}
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={55}
              className="react-switch"
              id="{this.props.id}" />
  </label>
    )
  }
}
ToggleSwitch.propTypes ={
  notifyChangeToggle:PropTypes.func,
  id: PropTypes.string,
  style: PropTypes.string
}
export default ToggleSwitch;