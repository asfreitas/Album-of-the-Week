import React from 'react';
import Album from './albumtile';

function UnclickableAlbum(props) {
    return (
        <div className='viewable'>
            <Album album={props.album} showStars={props.showStars}/>
        </div>
    );

}


export default UnclickableAlbum;