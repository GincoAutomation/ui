import React, { Component } from 'react';
import {set} from 'lodash';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch'
import RoomSlider from'./RoomSlider.js';
import PropTypes from 'prop-types';
import styled from 'styled-components'
//styling
const Table=styled.table`
border-collapse: collapse;
width: 300px;
`
const Th=styled.th`
&.left{
    background-color: #96a0fa;
    border-top-left-radius: 10px;
    width: 90px;
}
&.rigth{
    background-color: #96a0fa;
    border-top-right-radius: 10px;
}
`
const ButtonList=styled.ul`
width: 290px;
background-color: #e1e3fa;
list-style-type:none;
padding-left:10px;
padding-top: 10px;
margin:0;
border-bottom-right-radius: 10px;
border-bottom-left-radius: 10px;
`
const Icon=styled.img`
margin-right:0px;
margin-left:0px;
width: 70px;
`
const P=styled.p`
&.item{
    font-size: 25px;
    color: #262833;
    float:left;
    margin-top: 0px;
    margin-left: 19px;
    margin-right:10px;
    margin-bottom: 10px
}
&.slider{
    font-size: 25px;
    color: #262833;
    float:left;
    margin-top: 0px;
    margin-right: 90px;
    margin-bottom: 10px
}
&.debugState{
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    float:left;
    margin:15px;

}
&.roomName{
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    font-weight: 400;
    text-align: left;
    margin-bottom: 0;
    margin-top: 5px;

}
&.type{
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 100;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 20px;


}
`
//implementation
class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggleState: Array(this.props.toggles.length).fill(false),
            temperature:20,
            sliderUIcount:0,
        };
    }
    // Change of toggle switch 
    notifyChangeToggle(id,count){
        const changeInfo={
            room: this.props.name,
            type: "toggleEvent",
            UIName: this.props.toggles[id],
            value: !this.state.toggleState[id],
            UICount: count,
        };
        this.props.notifyChange(changeInfo);
        var path="toggleState["+id+"]";
        this.setState((state) => set(state, path, !this.state.toggleState[id]));
  
      }

    // Change of Temperature Slider 
      notifyChangeSlider(id,value){
        this.setState({temperature: value});
        const changeInfo={
            room: this.props.name,
            type: "sliderEvent",
            UIName: "TempSlider",
            value: value,            
        };
        this.props.notifyChange(changeInfo);
      }
      

    render(){
        const toggles=this.props.toggles;
        const toggleList= toggles.map((toggle,number) => {
            return (
                <li key={number}>
                  <ToggleSwitch id={number} notifyChangeToggle={(id,count)=>this.notifyChangeToggle(id,count) } style="room"/><P className="item">{toggle}</P>
                  <P className="debugState">{"current state: "+ this.state.toggleState[number]}</P>
                </li>
              );
        });
        return(
        <div>
            <Table>
                <tbody>
                    <tr>
                        <Th className="left"><Icon src={"images/"+this.props.name+".png"} alt="Icon" className="Icon"></Icon></Th>
                        <Th className="rigth">
                            <P className="roomName">{this.props.name}</P>
                            <P className="type">Leefruimte</P>
                        </Th>
                    </tr>
                </tbody>  
            </Table>
            <ButtonList >
                {toggleList}
                
                <li>
                    <P className="slider">{'Verwarming: '+this.state.temperature+'°C'}</P>
                    <RoomSlider id='TempSlider' notifyChangeSlider={(id,value)=>this.notifyChangeSlider(id,value) } />    
                </li>   
            </ButtonList>
            
        </div>
        );
    }
}
Room.propTypes ={
    toggles: PropTypes.array,
    name: PropTypes.string
}
export default Room;
