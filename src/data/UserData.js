class User {
  // Get All users
  static async getAll() {
    const res = await fetch('/API/users');
    if (!res.ok) return null;
    const data = await res.json();
    return data.results.map(userData => {
      const user = new User();
      Object.assign(user, userData);
      return user;
    });
  }

  static async getOne(id) {
    const res = await fetch(`/API/user/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    const user = new User();
    Object.assign(user, data);
    return user;
  }

  constructor(firstName, lastName, role) {
    this._id = null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

  getData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role
    };
  }

  async save() {
    if (this._id) {
      // save user
      const res = await fetch(`/API/user/${this._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.getData()),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) return true;
    } else {
      // create a new user
      const res = await fetch(`/API/users`, {
        method: 'POST',
        body: JSON.stringify(this.getData()),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json.status === 'inserted') {
        this._id = json.id;
        return true;
      }
    }
  }

  async delete() {
    const res = await fetch(`/API/user/${this._id}`, {
      method: 'DELETE'
    });
    if (res.ok) return true;
  }
}
User.roles = ['admin', 'user', 'guest'];

export default User;
