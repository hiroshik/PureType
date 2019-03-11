import React, {Component} from 'react';

class TypeBox extends Component {
  state = {
    startTimer: null,
  };

  startTimer = () => {
    this.setState({
      startTimer: (new Date()).getTime()
    })
  };

  validateTyping = (e) => {
    if (this.props.currentWord.toLowerCase() === e.target.value.toLowerCase()) {
      const endTimer = (new Date()).getTime();
      this.props.recordTime(this.props.currentWord, endTimer - this.state.startTimer);
    }
  };

  componentDidMount() {
    this.nameInput.focus();
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentWord !== this.props.currentWord) {
      this.nameInput.focus();
      this.nameInput.value = "";
      this.startTimer();
    }
  }

  render() {
    return <div className={"typeBox"}>
      <span className={"colorChip"} style={{backgroundColor: this.props.color}}/>
      <span className={"currentWord"}>
        {this.props.currentWord}
      </span>
      <input
        className={"typeBox"}
        ref={(input) => { this.nameInput = input; }}
        type={"text"}
        onChange={this.validateTyping}
        autoComplete={'off'}
        autoCorrect={'off'}
        autoCapitalize={'off'}
        autoFocus={true}
      />
    </div>
  }
}

export default TypeBox;