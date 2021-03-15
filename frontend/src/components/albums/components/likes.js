import { postData } from '../../../helpers/fetch';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-bootstrap/Toast';

import '../styles/thumbs.css'

export function ThumbsUp(props) {
    let className = 'thumb up';

    if(props.showLike) {
        className += ' selected';
    }
    return (
        <FontAwesomeIcon
        className={className}
        icon={faThumbsUp}/>
    );
}

export function Likes(props) {
    if(!props.likes) {
        return null;
    }
    let names = props.likes.map(name => name.username);
    if(names.length > 1) {
        names = names.map((value, index) => {
            if(index === names.length - 2) {
                if(names.length === 2){
                    return value + ' and ';
                }
                return value + ', and ';
            } 
            else if(index < names.length -1) {
                return value + ', '
            }
            else {
                return value;
            }
        });
    }
    names.toString();
    return ( props.likes.length > 0 && 
            <Toast  className='toasts' show={props.showLikes}  autohide={true}>
                <Toast.Body  className='bodys'>
                    {names} liked this song
                </Toast.Body>
            </Toast>
    )
}


export function likeOnClick(username, songId, index, updateLike) {
    console.log(index);
    let headerDict = {
        'access_token': undefined,
        'content': 'form'
    };
    postData('https://guardians-305413.wl.r.appspot.com/backend/album/likeTrack', headerDict, {trackId: songId, user: username});

    updateLike(index);

}
