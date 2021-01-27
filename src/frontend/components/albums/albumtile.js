import React from 'react';
import Card from 'react-bootstrap/Card';

import './styles/album.css';
function Album(props) {
        return(
            <Card key={props.album._id} className='album'>
                <CoverArt  cover={props.album.cover} height={props.album.height} width={props.album.width} />
                <Card.Body>
                    <div className='info'>
                        <Title title={props.album.title} />
                        <Artist artist={props.album.artist}/>
                        {props.link}
                    </div>
                
                </Card.Body>
            </Card>
    );
        
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
/*
function TrackList(props) {
    const songs = props.tracks;
    if(props.tracks === undefined)
    return "";
    const items = songs.map((song, index) =>
    <li key={song}>
       {index+1} {song}
    </li>
    );
    return(
        <ul>
            {items} 
        </ul>
    )
}
*/
export default Album;