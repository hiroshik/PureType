import React, { Component } from 'react';
import socket from "../socket";
import Loading from "../components/Loading";
import Trophy from "../components/Trophy";

const ledaderboard = [
  {name: "henry", score: 2432},
  {name: "henry2", score: 2532},
  {name: "henry3", score: 2832},
  {name: "henry4", score: 3032},
  {name: "henry5", score: 3432},
  {name: "henry6", score: 4432},
  {name: "henry7", score: 5532},
  {name: "henry8", score: 6832},
  {name: "henry9", score: 7032},
  {name: "henry10", score: 8432},
];

class LeaderBoard extends Component {
  socket = socket();
  state = {
    leaderBoard: ledaderboard,
    error: false
  };

  componentDidMount() {
    this.socket.on('leaderboard', (data) => {
      // this.setState({leaderBoard: data})
    });
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    const {leaderBoard} = this.state;

    if (leaderBoard.length === 0) {
      return <React.Fragment>
        <Loading text={"Loading LeaderBoard..."} />
      </React.Fragment>
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
                    <td>{user.name}</td>
                    <td>{user.score / 1000} s</td>
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
