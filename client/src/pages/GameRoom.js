import React, { Component } from 'react';
import CountDown from "../components/CountDown";
import TypeBox from "../components/TypeBox";
import socket from "../socket";
import Completion from "../components/Completion";

class GameRoom extends Component {
  socket = socket();

  state = {
    response: null,
    name: "",
    profileIsSet: false,
    gameStart: false,
    wordList: [],
    currentIndex: 0,
    completed: false,
    totalTime: 0
  };

  updateName = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  countdownEnd = () => {
    this.setState({gameStart: true})
  };

  recordTime = (word, timeSpent) => {
    if (this.state.currentIndex < this.state.wordList.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        totalTime: this.state.totalTime + timeSpent
      })
    } else {
      this.socket.emit('score', {userName: this.state.name, totalTime: this.state.totalTime});
      this.setState({completed: true});
      console.log('Complete');
    }
  };

  setProfile = () => {
    this.setState({profileIsSet: this.state.name !== ''});
  };

  componentDidMount() {
    this.socket.on('words', (data) => {
      this.setState({wordList: data})
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  renderUserInput = () => {
    return <React.Fragment>
      <input className={"personalInfo"} type="text" name="name" value={this.state.name} placeholder={"Name"} onChange={this.updateName} autoComplete={"off"}/>
      <button onClick={this.setProfile}>Start</button>
    </React.Fragment>
  };

  renderContent = () => {
    const { profileIsSet, gameStart, wordList, currentIndex, completed } = this.state;

    if (!profileIsSet) {
      return this.renderUserInput()
    }

    if (profileIsSet && !gameStart) {
      return <CountDown startTimer={3} timerEndCallback={this.countdownEnd}/>
    }

    if (completed) {
      return <Completion name={this.state.name} totalTime={this.state.totalTime}/>
    }

    return <TypeBox currentWord={wordList[currentIndex].word} color={wordList[currentIndex].color} recordTime={this.recordTime}/>

  };

  render() {
    return <div className={"gameRoom"}>
      {
        this.renderContent()
      }
    </div>
  }
}

export default GameRoom;
