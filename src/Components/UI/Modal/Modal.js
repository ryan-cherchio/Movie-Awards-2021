import React from 'react';

import './Modal.css';

const Modal = React.memo(props => {
  let message = <p>Please select a nominee for every category</p>
  return(
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="modal">
        <h2>Success! Ballot Submitted</h2>
        <p><strong>Check out your submission</strong></p>
        {props.details.length !== 0 ? props.details.map(item => (
            <li key={item.id}>
                <h4>{item.cat}</h4>
                <p><strong>Vote: </strong>{item.catitem[0].title}</p>
            </li>
        )) : message}

        <div className="modal__actions">
          <button className="close-button" type="button" onClick={props.onClose}>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Modal;
