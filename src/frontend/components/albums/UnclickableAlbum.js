import React from 'react';
import Album from './albumtile';

function UnclickableAlbum(props) {
    return (
        <div className='viewable'>
            <Album album={props.album} showStars={true} />
        </div>
    );

}


export default UnclickableAlbum;