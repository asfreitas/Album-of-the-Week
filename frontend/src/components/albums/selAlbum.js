import React from 'react';
import {Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from './components/albumheader';

import './styles/album.css';

const SelectableAlbum = (props) => {
        const path = props.addAlbum ? 'addalbum/' : '/albums/' + props.album.album_id;
        return (
            <Link to={{
                pathname: path,
                state: {
                    album: props.album
                }
                }}>
                <Card
                    bg='dark'
                    text='light'
                    border='light'
                    className='sel-album mb-3 '
                    album={props.album}>
                    <Header 
                        album={props.album}
                        albumClass='selectable'
                    />
                </Card>
            </Link>
         
    )
}
export default SelectableAlbum;