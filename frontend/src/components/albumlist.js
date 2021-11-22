import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import SelectableAlbum from './albums/selAlbum';
import { getData } from '../helpers/fetch';

import '../styles/albumgrid.css'
import './albums/styles/album.css';

const API_URL = process.env.REACT_APP_API_URL;

class AlbumList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album : null,
            loaded: false,
            year: this.props.year
        }
        this.updateAlbums = this.updateAlbums.bind(this);
    }
    async updateAlbums() {
        this.setState({year:this.props.year})
        let url = API_URL + '/backend/album';
        if(this.props.currentYear) {
            url += '/year';
            if(this.props.year) {
                url += '?year=' + this.props.year;
            }
        }
        var albums = await getData(url);
        this.setState({ album:albums, loaded: true });
    }
    componentDidMount() {
        this.updateAlbums();
        document.title = "Albums";
    }
    componentDidUpdate(prevProps) {
        if(this.props.year !== prevProps.year)
        {
            this.updateAlbums();
        }
  
    }

    render() {
        const loaded = this.state.loaded;
        let album = (
                this.state.album && this.state.album.map((currentAlbum, index) =>
                 (
                        <SelectableAlbum year={this.state.year} showStars={false} album={currentAlbum} key={currentAlbum.album_id} />
                ))
            );
    return ( 
            loaded ? <CardGroup className='AlbumGrid align-content-start'>
                {album}
            </CardGroup> : null
    );
    }
}

export default AlbumList;