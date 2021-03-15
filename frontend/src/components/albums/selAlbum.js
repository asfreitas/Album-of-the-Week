import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from './components/albumheader';

const SelectableAlbum = props => {

        const path = props.addAlbum ? 'addalbum/' : '/albums/' + props.album.album_id;

        return (
            <div className='selectable'>
                <Card
                    as='a'
                    bg='dark'
                    text='light'
                    border='dark'
                    className='album selectable mx-auto'
                    href={path}
                >
                    <Header 
                        album={props.album}
                        albumClass='selectable'
                    />
                </Card>
            </div> 
    )
}

export default SelectableAlbum;