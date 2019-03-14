import React, { Component } from 'react';
import socket from "../socket";
import Trophy from "../components/Trophy";
import Loading from "../components/Loading";


class LeaderBoard extends Component {
  socket = socket();
  state = {
    leaderBoard: [],
    error: false
  };

  componentDidMount() {
    this.socket.on('leaderboard', (data) => {
      console.log(data);
      this.setState({leaderBoard: data})
    });
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    const {leaderBoard} = this.state;

    if (leaderBoard.length === 0) {
      return <Loading text={"Loading Leader Board..."}/>
    }
    return (
      <div className={"leaderBoard"}>
        <h1>Leader Board</h1>
        <table className={"ranking"}>
          <thead>
            <tr>
              <th/>
              <th>Name</th>
              <th>TPW</th>
              <th>Attempts</th>
            </tr>
          </thead>
          <tbody>
          {
            leaderBoard.map((user, i) => {
              return (
                  <tr key={i}>
                    <td className={"order"}>
                      <Trophy position={i+1}/>
                    </td>
                    <td>{user.user}</td>
                    <td>{(user.score / 1000).toFixed(5)} s</td>
                    <td>{user.attempts}</td>
                  </tr>
                );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default LeaderBoard;
