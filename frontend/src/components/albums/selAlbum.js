import React from 'react';
import Album from './albumtile';
import { Link } from 'react-router-dom';


class SelectableAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album : null,
            finished: false
        }
        this.clickableLink = this.clickableLink.bind(this);

    }
    clickableLink() { 
        const path = this.props.addAlbum ? 'addalbum/' : '/albums/' + this.props.album['album_id'];
        return(
            <div>
                <Link className="stretched-link"
                to={{pathname:path, state: { album: this.props.album}}}></Link>
            </div>
        );
    }
    render() { return (
        <div className='selectable' >
            <Album link={this.clickableLink()} selectable={true} albumClass='selectable' album={this.props.album}/>
        </div>

    )}
}


export default SelectableAlbum;