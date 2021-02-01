import React from 'react';
import Album from './albums/albumtile';

import '../styles/albumgrid.css'

class AlbumList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album : null,
            finished: false
        }
    }
    componentDidMount() {
        var albums = getData('http://localhost:5001/albums');
        albums.then(value => {
            console.log(value);
            this.setState({
            album : value
        })});
    }
        render() {

            let album = (
                <section className='AlbumGrid'>
                {
                this.state.album && this.state.album.map(currentAlbum => (
                         <Album album={currentAlbum} />
                ))
                }
                </section>
                );
        return ( 
            <div>
                {album}
            </div>
            
        );
    }
}

async function getData(url) {
    let response = await fetch(url);
    const data = await response.json();
    return data;
}
export default AlbumList;