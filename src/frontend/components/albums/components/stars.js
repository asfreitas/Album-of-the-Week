import React from 'react';
import ReactStars from 'react-stars';
import { postData, putData } from '../../../helpers/fetch';
export function Stars(props) {
    return (
        <ReactStars
        size={'30'}
        value={0}
        onChange={(rating) => onStarsClick(rating, props.data)}
        />
    )
}
function onStarsClick(rating, data) {
    console.log(data);
    let url = 'http://localhost:5001/ratings/';
    if(rating === 0) {
        url += 'addRating';
        postData(url, undefined, );
    }
    else { 
        putData();
    }
}

export default Stars;