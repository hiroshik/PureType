import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  };

  connect = () => {

  };

  render() {
    return (
      <div>
        home
        <input className={"input"} placeholder={"Your Name"} value={this.state.email} onChange={this.updateEmail}/>
        <button onClick={this.connect}>
          Start
        </button>
      </div>
    );
  }
}

export default Home;
