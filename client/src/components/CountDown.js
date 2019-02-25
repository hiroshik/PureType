import React from 'react';

const CountDown = (props) => {
  if (props.countDown === 0) {
    return null;
  }

  return <div className={"fullscreen countDown"}>
    <span>{props.countDown}</span>
  </div>
};

export default CountDown;