import React, { Component } from 'react';
import socket from "../socket";
import Loading from "../components/Loading";

class LeaderBoard extends Component {
  socket = socket();
  state = {
    leaderBoard: {},
    error: false
  };

  componentDidMount() {
    this.socket.on('leaderboard', (data) => {
      this.setState({leaderBoard: data})
    });
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    const {leaderBoard} = this.state;

    if (Object.keys(leaderBoard).length === 0) {
      return <React.Fragment>
        <Loading text={"Loading LeaderBoard"} />
      </React.Fragment>
    }

    return (
      <React.Fragment>
        Leader Board
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.keys(leaderBoard).map((user, i) => {
              return (
                  <tr key={i}>
                    <td>{user}</td>
                    <td>{leaderBoard[user].score}</td>
                  </tr>
                );
            })

          }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default LeaderBoard;
