import React, { Component } from 'react';
import PropTypes from 'prop-types';

import User from '../../data/UserData';

class UserView extends Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      role: props.user.role || User.roles[0]
    }
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  async save(){
    this.props.user.firstName = this.state.firstName;
    this.props.user.lastName = this.state.lastName;
    this.props.user.role = this.state.role;
    await this.props.user.save();
    this.setState({ editMode: false });
    await this.props.refreshList();
  }

  async remove(){
    await this.props.user.delete();
    await this.props.refreshList();
  }

  render() {
    if (this.state.editMode || !this.props.user._id){
      return (
        <tr>
          <td>
            <input 
              type="text" 
              placeholder={'First Name'}
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
          </td>
          <td>
            <input 
              type="text" 
              placeholder={'Last Name'}
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
          </td>
          <td>
            <select
              value={this.state.role}
              onChange={(e) => this.setState({ role: e.target.value })}
            >
              {User.roles.map((role) => (<option key={role}>{role}</option>))}
            </select>
          </td>
          <td>
            <button onClick={this.save}>{this.props.user._id ? 'Save' : 'Create new'}</button>
            {this.props.user._id && 
              // reset state to original values in user 
              <button 
                onClick={() => this.setState({ 
                  editMode: false,
                  firstName: this.props.user.firstName,
                  lastName: this.props.user.lastName,
                  role: this.props.user.role            
                })}
              >Cancel</button> 
            }
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