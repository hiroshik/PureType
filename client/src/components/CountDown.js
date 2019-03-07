import React, {Component} from 'react';

class CountDown extends Component {
  state = {
    currentTimer: this.props.startTimer,
  };

  countingDown = (current) => {
    if (current >= 0) {
      this.setState({currentTimer: current - 1})
    }
  };

  callback = () => {
    clearInterval(this.countingDown);
    this.props.timerEndCallback()
  };

  componentDidMount() {
    setInterval(() => {
      this.countingDown(this.state.currentTimer)
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTimer === 0) {
      this.callback()
    }
  }

  render() {
    if (this.state.currentTimer < 0) {
      return null;
    }

    return <div className={"countDown"}>
      <span>{this.state.currentTimer}</span>
    </div>
  }
}

export default CountDown;