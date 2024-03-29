import React from 'react';
import Album from './albums/albumtile';
import { getData } from '../helpers/fetch';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

import '../styles/albumview.css';
const API_URL = process.env.REACT_APP_API_URL;

class AlbumViewer extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            album: undefined,
            loaded: false
        };
    };
    async componentDidMount() {
        const albums = this.props.isWeeklyAlbum
         ? 'getWeeklyAlbum' : '' + this.props.match.params.albumId;
        const url = API_URL + '/backend/album/' + albums;
        let album = await getData(url);
        this.setState({ album: album, loaded: true });
        document.title = this.state.album.title;
    }
    render() {
        return(
            <div className='albumView'>
                {this.state.loaded ? <Album showBody={true} showStars={true} album={this.state.album}/> : null}
            </div>
        )
    }
}


export default withCookies(AlbumViewer);