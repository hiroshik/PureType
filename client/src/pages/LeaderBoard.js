import React, { Component } from 'react';
import socket from "../socket";
import Trophy from "../components/Trophy";


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

    return (
      <div className={"leaderBoard"}>
        <h1>Leader Board</h1>
        <table className={"ranking"}>
          <thead>
            <tr>
              <th/>
              <th>Name</th>
              <th>TPW</th>
            </tr>
          </thead>
          <tbody>
          {
            leaderBoard.length > 0 &&
            leaderBoard.map((user, i) => {
              return (
                  <tr key={i}>
                    <td className={"order"}>
                      <Trophy position={i+1}/>
                    </td>
                    <td>{user.user}</td>
                    <td>{(user.average / 1000).toFixed(5)} s</td>
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
