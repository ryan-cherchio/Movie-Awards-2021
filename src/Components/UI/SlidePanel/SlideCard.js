import React from 'react';

const SlideCard = React.memo(props => {
  return (
    <div>
        {props.submission.map(sub => (
            <li key={sub.id}>
                <p><strong>{sub.cat}</strong></p>
                <p><i>{sub.catitem[0].title}</i></p>
            </li>
        ))}
    </div>
  );
});

export default SlideCard;
