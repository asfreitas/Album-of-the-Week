import React from 'react';
import ViewableAlbum from './albums/viewAlbum';
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
            this.setState({album:album})
            this.setState({loaded: true})

        })();
    }

    render() {

        return(
            this.state.loaded && <ViewableAlbum album={this.state.album}/>
        )
    }

}


export default AlbumViewer;