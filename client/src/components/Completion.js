import React from 'react';
import {Link} from "react-router-dom";

const Completion = ({name, totalTime}) => {
  return <React.Fragment>
    <h1>Congratulations {name}!</h1>
    <p>You have successfully completed the challenge. Your total time is {totalTime} milliseconds!</p>
    <p>You may check the <Link to={'/leader-board'}>Leader Board</Link> to compare with others.</p>
  </React.Fragment>
};

export default Completion;