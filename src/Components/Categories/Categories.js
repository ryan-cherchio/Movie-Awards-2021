import React from 'react';
import './Categories.css';
import Card from './../UI/Card/Card';


const Categories = (props) => props.categories.map((cat, index) => {
  return (
    <div key={cat.id} className='category'>
        <h2>{cat.title}</h2>
        <div className="row">
            {cat.catitems.map(item => (
            <Card key={item.id} selected={item.isSelected} click={props.onSelectItem.bind(this, cat.id, item.id)}>
                <h3>{item.title}</h3>
                <img src={item.photoUrL} alt={item.title} />
                <button>{item.isSelected ? 'Selected' : 'Select Nominee'}</button>
            </Card>
            ))}
        </div>
    </div>
  );
});

export default Categories;