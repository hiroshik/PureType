import React, { Component } from 'react';

class GameRoom extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
    };
  }

  componentDidMount() {

  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
            loaded
          </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default GameRoom;
