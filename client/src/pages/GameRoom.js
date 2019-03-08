import React, { Component } from 'react';
import CountDown from "../components/CountDown";
import TypeBox from "../components/TypeBox";
import {Link} from "react-router-dom";

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
  state = {
    response: null,
    name: "",
    email: "",
    profileIsSet: false,
    gameStart: false,
    wordList: words,
    currentIndex: 0,
    completed: false,
    totalTime: 0,
  };

  updateEmail = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  timerEnd = () => {
    this.setState({gameStart: true})
  };

  recordTime = (word, timeSpent) => {
    console.log({word: word, time: timeSpent});
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

  renderEmailInput() {
    return <div className={"gameRoom"}>
      <input className={"personalInfo"} type="text" name="name" value={this.state.name} placeholder={"Name"} onChange={this.updateEmail} autoComplete={"off"}/>
      <input className={"personalInfo"} type="email" name="email" value={this.state.email} placeholder={"Email"} onChange={this.updateEmail} autoComplete={"off"}/>
      <button onClick={()=> {this.setState({profileIsSet: this.state.name !== '' && this.state.email !== ''})}}>Start</button>
    </div>
  };

  render() {
    const { profileIsSet, gameStart, wordList, currentIndex, completed } = this.state;

    if (!profileIsSet) {
      return this.renderEmailInput()
    }

    if (profileIsSet && !gameStart) {
      return <div className={"gameRoom"}>
        <CountDown startTimer={3} timerEndCallback={this.timerEnd}/>
      </div>
    }

    if (completed) {
      return <div  className={"gameRoom"}>
        <h1>Congratulations!</h1>
        <p>You have successfully complete the challenge. Your total time is {this.state.totalTime} milliseconds!</p>
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
