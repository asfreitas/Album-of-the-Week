import React from 'react';
import UnclickableAlbum from './albums/UnclickableAlbum';
import { getData } from '../helpers/fetch';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
class AlbumViewer extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = this.props;
        console.log(cookies.get('username'));
        this.state = {
            album: undefined,
            loaded: false
        };
        
    };
    async componentDidMount() {
        const albums = 
        this.props.isWeeklyAlbum ? 'getWeeklyAlbum' : 'album/' + this.props.match.params.albumId;
        const url = 'http://localhost:5001/albums/' + albums;
        let album = await getData(url);
        console.log(album);
        this.setState({album:album})
        this.setState({loaded: true})
    }
    render() {
        let loaded = this.state.loaded;
        return(
            loaded ? <UnclickableAlbum showStars={false} album={this.state.album}/> : 'loading'
        )
    }

}


export default withCookies(AlbumViewer);