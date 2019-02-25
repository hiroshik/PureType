import React from 'react';
import {Link} from "react-router-dom";

const Navigation = (props) => {
  return <div className={"navigation"}>
    <ul>
      <li><Link to={"/"}><div className="key"><div className="keycap">P</div></div></Link></li>
      <li><Link to={"/game-room"}>Game Room</Link></li>
      <li><Link to={"/leaderboard"}>Leaderboard</Link></li>
    </ul>
  </div>
};

export default Navigation