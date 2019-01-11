import React, { Component, Fragment } from 'react';

const UI_VERSION = '0.1.0';

class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverState: "Fetching",
      error: null,
      APIinfo: null
    }
  }
  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI(){
    try {
      const res = await fetch('/API');
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      const info = await res.json();
      this.setState({
        serverState: 'Connected',
        error: null,
        APIinfo: info
      })
    } catch(err) {
      this.setState({
        serverState: 'Error',
        error: err,
        APIinfo: null
      })
    }
  }

  render() {
    return (
      <Fragment>
        <h2>Ginko Home Automation</h2> 
        <p>Version: <b>{UI_VERSION}</b></p>
        <p>Server state: <b>{this.state.serverState}</b></p>
        {this.state.APIinfo && <div>API info:<pre>{JSON.stringify(this.state.APIinfo, null, 2)}</pre></div>}
        {this.state.error && <div>Error:<pre>{this.state.error.message}</pre></div>}
      </Fragment>
    );
  }
}

export default About;