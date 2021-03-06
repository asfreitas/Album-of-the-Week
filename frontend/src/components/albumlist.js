import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
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
            finished: false,
            year: this.props.year
        }
        this.updateAlbums = this.updateAlbums.bind(this);
    }
    async updateAlbums() {
        this.setState({year:this.props.year})
        let url = API_URL + '/backend/album';
        console.log(url);
        if(this.props.currentYear) {
            url += '/year';
            if(this.props.year) {
                url += '?year=' + this.props.year;
            }
        }
        var albums = await getData(url);
        this.setState({album: undefined});
        this.setState({album:albums})
    }
    componentDidMount() {
        this.updateAlbums();
    }
    componentDidUpdate(prevProps) {

        if(this.props.year !== prevProps.year) {
            console.log("...updating")
            this.updateAlbums();
        }
    }
    render() {

        let album = (
                this.state.album && this.state.album.map((currentAlbum, index) => (
                        <SelectableAlbum year={this.props.year} showStars={false} album={currentAlbum} key={currentAlbum.album_id} />
                ))
            );
    return ( 
            <CardDeck className='AlbumGrid'>
                {album}
            </CardDeck>
    );
    }
}

export default AlbumList;