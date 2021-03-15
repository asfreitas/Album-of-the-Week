import React, { useState } from 'react';
import { likeOnClick, Likes, ThumbsUp } from './likes';
import { useCookies} from 'react-cookie';

import '../styles/tracks.css';

function TrackList(props) {
    const [cookies, setUsername, removeUsername]= useCookies(['user']);

    const songs = props.songs;
    if(!songs) return null;
    
    const items = songs.map((song, index) => 
        <div key={index}>
            <Track
            song={song}
            index={index}
            likeOnClick={() => likeOnClick(cookies.user.username, song['track_id'], index, props.updateLike)}

            />
        </div>
    );

    return(
        <ul className='list-unstyled'>
            {items}
        </ul>
    )
}
function Track(props) {
    const [showLikes, setShowLikes] = useState(false);
    let song = props.song;

    const [cookies, setUsername, removeUsername]= useCookies(['user']);
    let dislikedSong = false;
    let likedSong = false;
       // dislikedSong = song.dislikes.some(name => name.username === cookies.user.username); // https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e/8217584#8217584
       // likedSong = song.likes.some(name => name.username === cookies.user.username);
    if(song.dislikes.length > 0) {dislikedSong = true;}
    if(song.likes.length > 0) {likedSong = true;}


    return (
        <li key={song['track_id']}>
            <div className='track'>
                <div className='trackName'>
                    {song['name']}
                </div>
                <span
                        className='like'
                        onClick={() => props.likeOnClick(cookies.user.username, song['track_id'], props.index)}
                        onMouseEnter={() =>setShowLikes(showLikes => showLikes=true)}
                        onMouseLeave={() => setShowLikes(showLikes => showLikes=false)}>
                            <ThumbsUp showLike={likedSong} className='thumbs-up float-right'/>
                            <Likes likes={song['likes']} showLikes={showLikes} />
                </span>

            </div>
        </li>
    )};

export default TrackList;