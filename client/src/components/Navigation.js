import React from 'react';
import {Link} from "react-router-dom";

const Navigation = (props) => {
  return <div className={"navigation"}>
    <div className="logo"><Link to={"/"}><div className="key"><div className="keycap">P</div></div></Link></div>
    <ul>
      <li><Link to={"/game-room"}>Game Room</Link></li>
      <li><Link to={"/leaderboard"}>Leaderboard</Link></li>
    </ul>
  </div>
};

export default Navigation