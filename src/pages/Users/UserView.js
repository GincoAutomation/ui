import React, { Component } from 'react';
import PropTypes from 'prop-types';

import User from '../../data/UserData';

class UserView extends Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: !props.user._id
    }
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.roleInput = React.createRef();
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  async save(){
    this.props.user.firstName = this.firstNameInput.current.value;
    this.props.user.lastName = this.lastNameInput.current.value;
    this.props.user.role = this.roleInput.current.value;
    await this.props.user.save();
    this.setState({ editMode: false });
    await this.props.refreshList();
  }

  async remove(){
    await this.props.user.delete();
    await this.props.refreshList();
  }

  render() {
    if (this.state.editMode){
      return (
        <tr>
          <td>
            <input 
              type="text" 
              ref={this.firstNameInput} 
              placeholder={'First Name'}
              defaultValue={this.props.user.firstName}
            />
          </td>
          <td>
            <input 
              type="text" 
              ref={this.lastNameInput} 
              placeholder={'Last Name'}
              defaultValue={this.props.user.lastName}
            />
          </td>
          <td>
            <select
              ref={this.roleInput}
              defaultValue={this.props.user.role}
            >
              {User.roles.map((role) => (<option key={role}>{role}</option>))}
            </select>
          </td>
          <td>
            <button onClick={this.save}>{this.props.user._id ? 'Save' : 'Create new'}</button>
            {this.props.user._id && <button onClick={() => this.setState({ editMode: false })}>Cancel</button> }   
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{this.props.user.firstName}</td>
          <td>{this.props.user.lastName}</td>
          <td>{this.props.user.role}</td>
          <td>
            <button onClick={() => this.setState({ editMode: true })}>Edit</button>
            <button onClick={this.remove}>Remove</button>
          </td>
        </tr> 
      );
    }
  }
}

User.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    role: PropTypes.string
  }),
  refreshList: PropTypes.func,
}


export default UserView;