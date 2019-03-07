import React, { Component } from 'react';
import CountDown from "../components/CountDown";

class GameRoom extends Component {
  state = {
    response: null,
    wordList: [],
    name: "",
    email: "",
    profileIsSet: false,
    gameStart: false
  };

  updateEmail = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  timerEnd = () => {
    console.log('Ends');
    this.setState({gameStart: true})
  }

  componentDidMount() {

  }

  renderEmailInput() {
    return <div className={"gameRoom"}>
      <input className={"personalInfo"} type="text" name="name" value={this.state.name} placeholder={"Name"} onChange={this.updateEmail}/>
      <input className={"personalInfo"} type="email" name="email" value={this.state.email} placeholder={"Email"} onChange={this.updateEmail}/>
      <button onClick={()=> {this.setState({profileIsSet: this.state.name !== '' && this.state.email !== ''})}}>Start</button>
    </div>
  };

  render() {
    const { profileIsSet, gameStart } = this.state;

    if (!profileIsSet) {
      return this.renderEmailInput()
    }

    if (profileIsSet && !gameStart) {
      return <div className={"gameRoom"}>
        <CountDown startTimer={3} timerEndCallback={this.timerEnd}/>
      </div>
    }

    return (
      <div className={"gameRoom"}>
        Game started
      </div>
    );
  }
}

export default GameRoom;
