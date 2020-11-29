import React from 'react';
import '../styles/album.css'

function Album(props) {
        return(
            <section className='album'>
            <CoverArt cover={props.album.cover} />
            <div className='artistinfo'>
                <Title title={props.album.title} />
                <Artist artist={props.album.artist} />
            </div>
            <TrackList />
        </section>
    );
        
}

function Artist(props) {
    console.log(props.artist);
    return(
    <h4>{props.artist}</h4>
    );
}
function Title(props) {
    return(
        <h1>{props.title}</h1>
    )
}
function CoverArt(props){
    return(
    <img className='cover' alt='' src = {props.cover}></img>
    );
}
const TrackList = () => {
    return(
        <ul>
            <li>Smells Like Teen Spirit</li>
            <li>In Bloom</li>
            <li>Come as you are</li>
            <li>Breed</li>
            <li>Lithium</li>
            <li>Polly</li>
            <li>Territorial Pissings</li>
            <li>Drain You</li>
            <li>Lounge Act</li>
            <li>Stay Away</li>
            <li>On the Plain</li>
            <li>Something in the Way</li>
        </ul>
    );
}

export default Album;