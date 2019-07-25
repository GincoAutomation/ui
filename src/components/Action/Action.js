import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Table=styled.table`
border-collapse: collapse;
background-color: #fa9696;
width: 300px;
height: 100px;
border-radius:10px;
:hover {
    background-color:  #f86d6d;
    box-shadow: 0 4px 8px 0 rgba(250, 150, 150, 0.2), 0 6px 20px 0 rgba(250, 150, 150, 0.19);
  }
`
const Th=styled.th`
&.left{
    background-color: none;
    width: 90px;
}
&.rigth{
    background-color: none;
}
`
const Icon=styled.img`
margin-right:0px;
margin-left:0px;
width: 90px;
`
const P=styled.p`
&.name{
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    font-weight: 400;
    text-align: left;
    margin-bottom: 0;
    margin-top: 5px;

}
&.subtext{
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 100;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 20px;
}
`
class Action extends Component {
    constructor(props){
        super(props);
        this.state = {
            countUI:0,  
        };
    }

    handleButtonClick(){
        this.setState({countUI: this.state.countUI+1,});        
        const changeInfo={
            room: "N/A",
            type: "ActionEvent",
            UIName: this.props.name ,
            value: "Clicked",
            UICount: this.state.countUI,
        };
        this.props.notifyChange(changeInfo);
    }
    render(){
        return(
            <div>
                <Table onClick={() => this.handleButtonClick()}>
                    <tbody>
                        <tr>
                            <Th className="left"><Icon src={"images/"+this.props.name+".png"} alt="Icon" className="Icon"></Icon></Th>
                            <Th className="rigth">
                                <P className="name">{this.props.name}</P>
                                <P className="subtext">{this.props.subtext}</P>
                            </Th>
                        </tr>
                    </tbody>  
                </Table>
            </div>
        )}
}
Action.propTypes ={
    name: PropTypes.string,
    subtext: PropTypes.string,
    notifyChange: PropTypes.func
}
export default Action;