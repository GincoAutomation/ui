import React, { Component } from 'react';

import './Table.css';

import User from '../../data/UserData';
import UserView from './UserView';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }
  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const users = await User.getAll();
    this.setState({ users });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <table>
          <tbody>
            <tr>
              <th style={{ width: '200px' }}>First Name</th>
              <th style={{ width: '200px' }}>Last Name</th>
              <th style={{ width: '100px' }}>Role</th>
              <th style={{ width: '130px' }}></th>
            </tr>
            {this.state.users &&
              this.state.users.map(user => <UserView key={user._id} user={user} refreshList={this.fetchUsers} />)}
            <UserView user={new User()} refreshList={this.fetchUsers} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
