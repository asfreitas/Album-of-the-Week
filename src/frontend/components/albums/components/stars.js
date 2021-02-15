import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './stars.css';


function StarRating(props) {
    const classNames = Array(props.starsCount || 5).fill('star');
    const initialValue = props.value || 0;
    const allowEditing = props.allowEditing || true;
    const [starCount, setStars] = useState(initialValue);
    const [clicked, setClicked] = useState(false);

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
            props.onClick(initialValue, starCount);

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
        if(!clicked) {
            setStars(0);
        }
    }
    /*return stars*/
    return (
        <div>
            {classNames.map((star, index, array) =>
            <FontAwesomeIcon
            className={`${star} ${starCount > index ? ' highlighted' : ''}`} 
            onMouseDown={() => onMouseDown(index) }
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            size="2x" 
         icon={faStar}
         />
            )}
        </div>
        )
}




export default StarRating;