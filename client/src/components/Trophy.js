import React from 'react';

const Trophy = ({position}) => {
  if (!position) {
    return null
  }

  switch (position) {
    case 1:
      return <React.Fragment>
        <i className="fas fa-trophy" style={{color: '#FFCF44'}}/>
      </React.Fragment>;
    case 2:
      return <React.Fragment>
        <i className="fas fa-star"  style={{color: '#FF6859'}}/>
      </React.Fragment>;
    default:
      return <React.Fragment>
       {position}
      </React.Fragment>;
  }
};

export default Trophy;