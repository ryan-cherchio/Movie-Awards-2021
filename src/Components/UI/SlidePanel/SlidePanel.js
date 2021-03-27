import React from 'react';
import SlideCard from './SlideCard';
import './SlidePanel.css';

const SlidePanel = React.memo(props => {
    let message = <p>No results have been submitted</p>
    return (
        <React.Fragment>
            <div className="backdrop" onClick={props.onClose} />
            <div className="sidepanel">
            <h2>Latest Submissions</h2>
            {props.details.length !== 0 ? 
                props.details.map((item, key) => {
                return (
                    <div key={key} className="slidecard-panel">
                        <h4>Submission {key+1}</h4>
                        <SlideCard 
                            submission={item}
                        />
                    </div>
                ) 
            }) : message}
            <div className="sidepanel__actions">
                <button className="close-button" type="button" onClick={props.onClose}>
                </button>
            </div>
            </div>
        </React.Fragment>
    );
});

export default SlidePanel;
