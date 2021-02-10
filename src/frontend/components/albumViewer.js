import React from 'react';
import UnclickableAlbum from './albums/UnclickableAlbum';
import { getData } from '../helpers/fetch';
class AlbumViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            album: undefined,
            loaded: false
        };
        
    };
    componentDidMount() {
        const id = this.props.match.params.albumId;
        const url = 'http://localhost:5001/albums/' + id; 
        (async () => {
            let album = await getData(url);
            console.log(album);
            this.setState({album:album})
            this.setState({loaded: true})
        })();
    }
    render() {
        let loaded = this.state.loaded;
        return(
            loaded ? <UnclickableAlbum album={this.state.album}/> : 'loading'
        )
    }

}


export default AlbumViewer;