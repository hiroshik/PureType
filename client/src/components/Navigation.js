import React from 'react';
import {Link} from "react-router-dom";

const Navigation = (props) => {
  return <ul>
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/leaderboard"}>Leaderboard</Link></li>
    </ul>
};

export default Navigation