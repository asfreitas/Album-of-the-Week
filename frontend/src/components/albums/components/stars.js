import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './stars.css';

export default function StarRating(props) {
    const classNames = Array(props.starsCount || 5).fill('star');
    const [initialValue, setInitialValue] = useState(props.value || 0);
    const [starCount, setStars] = useState(initialValue);
    const [clicked, setClicked] = useState(false);
    const allowEditing = props.allowEditing;

    /* function namespace */

    function onMouseDown(index) {
        if(!allowEditing) {
            return;
        }
        if(clicked) {
            setStars(0);
        }
        else {
            setStars(index+1)
            setInitialValue(index+1);
            props.onClick(starCount);

        }
        setClicked(!clicked);
        
    }

    function onMouseEnter(index) {
        if(!allowEditing) {
            return;
        }
        if(!clicked) {
            setStars(index+1);
        }
    }
    function onMouseLeave() {
        if(!allowEditing) {
            return;
        }
        if(!clicked) {
            setStars(initialValue);
        }
    }
    return (
        <div>
            {classNames.map((star, index, array) =>
            <FontAwesomeIcon
            key={index}
            className={`${star} ${starCount > index ? ' highlighted' : ''}`} 
            onMouseDown={() => onMouseDown(index) }
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            size={props.size}
            icon={faStar}
            />
            )}
        </div>
        )
}

StarRating.defaultProps = {
    allowEditing: false
}