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
        this.state = {
            album: undefined,
            loaded: false
        };
        
    };
    async componentDidMount() {
        const albums = 
        this.props.isWeeklyAlbum ? 'getWeeklyAlbum' : '' + this.props.match.params.albumId;
        const url = 'https://guardians-305413.wl.r.appspot.com/backend/album/' + albums;
        console.log(url);
        let album = await getData(url);
        this.setState({album:album})
        this.setState({loaded: true})
    }
    render() {
        let loaded = this.state.loaded;
        return(
                loaded ? <UnclickableAlbum showBody={true} showStars={true} album={this.state.album}/> : 'loading'
        )
    }

}


export default withCookies(AlbumViewer);