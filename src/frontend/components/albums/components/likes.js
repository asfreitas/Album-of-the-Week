import { postData } from '../../../helpers/fetch';
import React from 'react';
import { ThumbsdownIcon, ThumbsupIcon} from '@primer/octicons-react';
import Toast from 'react-bootstrap/Toast';

export function ThumbsUp(props) {
    return (
        <ThumbsupIcon/>
    );
}

export function ThumbsDown(props) {
    return ( 
        <ThumbsdownIcon/>
    );
}

export function Likes(props) {
    let names = props.likes[0];
    return ( props.likes.length > 0 && 
            <Toast  className='toasts' show={props.showLikes}  autohide={true}>
                <Toast.Body  className='bodys'>
                    {names['username']} liked this song
                </Toast.Body>
            </Toast>
    )
}
export function likeOnClick(songId, index, updateLike) {
    console.log(index);
    let headerDict = {
        'access_token': undefined,
        'content': 'form'
    };
    postData('http://localhost:5001/albums/likeTrack', headerDict, {trackId: songId});

    updateLike(index);

}