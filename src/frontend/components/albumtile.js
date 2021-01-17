import React from 'react';
import '../styles/album.css'
import Card from 'react-bootstrap/Card'

function Album(props) {
        return(
        <section className='album'>
            <Card className='main'>
            <Card.Body>
                <div className='maininfo'>
                    <CoverArt  cover={props.album.cover} height={props.album.height} width={props.album.width} />
                    < Title className='title' title={props.album.title} />
                </div>
            
                <TrackList className='tracks' tracks={props.album.tracks}/>
            </Card.Body>
            </Card>
        </section>
    );
        
}
function Title(props) {
    return(
        <Card.Title className='title'>{props.title}</Card.Title>
    )
}
function CoverArt(props){
    return(
        <img variant="top" className='cover' src={props.cover} height={props.height}
        width={props.width} />
    );
}
function TrackList(props) {
    const songs = props.tracks;
    console.log(songs);
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

export default Album;