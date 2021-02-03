import React from 'react';
import Album from './albumtile';


function ViewableAlbum(props) {
    return (
        <div className='viewable'>
            <Album album={props.album} />
        </div>
    );

}


export default ViewableAlbum;