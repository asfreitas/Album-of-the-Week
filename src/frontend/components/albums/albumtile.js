import React from 'react';
import Card from 'react-bootstrap/Card';
import './styles/album.css';
import { ThumbsdownIcon, ThumbsupIcon} from '@primer/octicons-react';
class Album extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: props.album
        }
        console.log(this.state.album);
        this.favoriteOnClick = this.favoriteOnClick.bind(this);
        this.TrackList = this.TrackList.bind(this);
        this.unfavoriteOnClick = this.unfavoriteOnClick.bind(this);
    }
     favoriteOnClick(songId) {
        console.log(songId);
    }
    unfavoriteOnClick(songId) {
        console.log(songId);
    }
    TrackList() {
        const songs = this.state.album.tracks;

        const items = songs.map((song, index) =>
        <li key={song['track_id']} >
            {song['name']} 
            <span onClick={() => this.favoriteOnClick(song['track_id'])}>
                <ThumbsupIcon/> 
            </span>
            <span onClick={() => this.favoriteOnClick(song['track_id'])}>
                <ThumbsdownIcon/> 
            </span>            
        </li>
        );
        return(
            <ol>
                {items} 
            </ol>
        )
    }

    render() {
        
            return(
                <Card className='album'>
                    <CoverArt  cover={this.state.album.cover} height={this.state.album.height} width={this.state.album.width} />
                    <Card.Body>
                        <div className='info'>
                            <Title title={this.state.album.title} />
                            <Artist artist={this.state.album.artist}/>
                            {this.state.link}
                        </div>
                        {this.TrackList()}
                    </Card.Body>
                </Card>
        );
    }

}
function Artist(props) {
    return (
        <Card.Subtitle className='artist'>{props.artist}</Card.Subtitle>
    );
}
function Title(props) {
    return(
        <Card.Text className='title'>{props.title}</Card.Text>
    )
}
function CoverArt(props){
    return(
        <Card.Img className='cover' variant="top" src={props.cover}  />
    );
}


export default Album;