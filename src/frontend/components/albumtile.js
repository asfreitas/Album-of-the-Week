import React from 'react';
import '../styles/album.css'

const Album = () => {
    return (
        <section sectionName='album'>
            <CoverArt />
            <div className='artistinfo'>
                <Title />
                <Artist />
            </div>
            <TrackList />
        </section>
    );

}

const Artist = () => {
    return(
    <h4>by Nirvana</h4>
    );
}
const Title = () => {
    return(
        <h1>Nevermind</h1>
    )
}
const CoverArt = () => {
    return(
    <img className='cover' alt='' src = 'http://static.rawckus.com/wp-content/uploads/2016/03/nirvana-nevermind-1.jpg'></img>
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