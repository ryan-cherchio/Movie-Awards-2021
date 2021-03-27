import React from 'react';
import './Card.css';

const Card = React.memo(props => {
  return (<div className="col">
            <div className={`card ${props.selected ? 'selected' : ''}`} onClick={props.click}>{props.children}</div>
        </div>);
});

export default Card;
