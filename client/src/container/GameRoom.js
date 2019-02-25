import React, { Component } from 'react';
import CountDown from "../components/CountDown";

class GameRoom extends Component {
  state = {
    response: null,
    countDown: 3,
    wordList: []
  };

  componentDidMount() {

  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <CountDown countDown={3}/>
      </div>
    );
  }
}

export default GameRoom;
