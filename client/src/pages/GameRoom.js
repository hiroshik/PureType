import React, { Component } from 'react';
import CountDown from "../components/CountDown";
import TypeBox from "../components/TypeBox";
import {Link} from "react-router-dom";
import socket from "../socket";

const words = [{'word': 'aliceblue', 'color': 'F0F8FF'},
  {'word': 'antiquewhite', 'color': 'FAEBD7'},
  {'word': 'aqua', 'color': '00FFFF'},
  {'word': 'aquamarine', 'color': '7FFFD4'},
  {'word': 'azure', 'color': 'F0FFFF'},
  {'word': 'beige', 'color': 'F5F5DC'},
  {'word': 'bisque', 'color': 'FFE4C4'},
  {'word': 'black', 'color': '000000'},
  {'word': 'blanchedalmond', 'color': 'FFEBCD'},
  {'word': 'blue', 'color': '0000FF'} ];

class GameRoom extends Component {
  // socket = socket();
  state = {
    response: null,
    name: "",
    profileIsSet: false,
    gameStart: false,
    wordList: words,
    currentIndex: 0,
    completed: false,
    totalTime: 0,
  };

  updateName = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  timerEnd = () => {
    this.setState({gameStart: true})
  };

  recordTime = (word, timeSpent) => {
    console.log({user: this.state.name, word: word, time: timeSpent});
    if (this.state.currentIndex < this.state.wordList.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        totalTime: this.state.totalTime + timeSpent
      })
    } else {
      this.setState({completed: true});
      console.log('Complete');
    }
  };

  renderUserInput() {
    return <div className={"gameRoom"}>
      <input className={"personalInfo"} type="text" name="name" value={this.state.name} placeholder={"Name"} onChange={this.updateName} autoComplete={"off"}/>
      <button onClick={()=> {this.setState({profileIsSet: this.state.name !== ''})}}>Start</button>
    </div>
  };

  render() {
    const { profileIsSet, gameStart, wordList, currentIndex, completed } = this.state;

    if (!profileIsSet) {
      return this.renderUserInput()
    }

    if (profileIsSet && !gameStart) {
      return <div className={"gameRoom"}>
        <CountDown startTimer={3} timerEndCallback={this.timerEnd}/>
      </div>
    }

    if (completed) {
      return <div  className={"gameRoom"}>
        <h1>Congratulations {this.state.name}!</h1>
        <p>You have successfully completed the challenge. Your total time is {this.state.totalTime} milliseconds!</p>
        <p>You may check the <Link to={'/leader-board'}>Leader Board</Link> to compare with others</p>
      </div>
    }

    return (
      <div className={"gameRoom"}>
        <TypeBox currentWord={wordList[currentIndex].word} recordTime={this.recordTime}/>
      </div>
    );
  }
}

export default GameRoom;
