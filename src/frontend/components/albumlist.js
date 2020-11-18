import React from 'react';
import Album from './albumtile';

import '../styles/albumgrid.css'

const List = () => {
    return ( 
        <section className='AlbumGrid'>
            <Album />
            <Album />
            <Album />
            <Album />
            <Album />
        </section>
    );
}

export default List;