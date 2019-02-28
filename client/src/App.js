import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import GameRoom from "./container/GameRoom";
import Home from "./container/Home";
import LeaderBoard from "./container/LeaderBoard";
import Navigation from "./components/Navigation";

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className={"app"}>
        <BrowserRouter>
          <React.Fragment>
            <Navigation/>
            <main>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/game-room' component={GameRoom}/>
              <Route exact path='/leaderBoard' component={LeaderBoard}/>
              <Redirect to="/" />
            </Switch>
            </main>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
