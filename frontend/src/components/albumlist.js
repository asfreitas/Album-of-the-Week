import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import SelectableAlbum from './albums/selAlbum';
import '../styles/albumgrid.css'
import './albums/styles/album.css';
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
    updateAlbums() {
        console.log(this.state.year);
        this.setState({year:this.props.year})
        let url = 'https://guardians-305413.wl.r.appspot.com/backend/album';
        if(this.props.currentYear) {
            url += '/year';
            if(this.props.year) {
                url += '?year=' + this.props.year;
            }
        }
        console.log(url);
        var albums = getData(url);
        albums.then(value => {
            this.setState({album:undefined})
            this.setState({
            album : value
        })});
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

async function getData(url) {
    let response = await fetch(url);
    const data = await response.json();
    return data;
}
export default AlbumList;