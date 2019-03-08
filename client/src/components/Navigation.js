import React from 'react';
import {Link} from "react-router-dom";

const Navigation = (props) => {
  return <nav>
    <ul>
      <li>
        <Link to={"/game-room"}>
          <i className="fas fa-keyboard" />
          Game Room
        </Link>
      </li>
      <li>
        <Link to={"/leader-board"}>
          <i className="fas fa-crown" />
          Leaderboard
        </Link>
      </li>
    </ul>

    <div className="logo"><Link to={"/"}><div className="key"><div className="keycap">P</div></div></Link></div>
  </nav>
};

export default Navigation