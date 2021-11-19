import React from 'react';
import Album from './albumtile';

import '../../styles/unclickable.css';

const UnclickableAlbum = (props) => {
    return (
        <div className='main'>
            <Album albumClass='unClickable' showBody={props.showBody} album={props.album} showStars={props.showStars}/>
            </div>
    );

}

export default UnclickableAlbum;