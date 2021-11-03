import React, { useState } from 'react';
import { likeOnClick, Likes, ThumbsUp } from './likes';
import { useCookies} from 'react-cookie';

import '../styles/tracks.css';

const Track = (props) => {
    const [showLikes, setShowLikes] = useState(false);
    let song = props.song;

    const [cookies]= useCookies(['user']);
    let likedSong = false;
       // dislikedSong = song.dislikes.some(name => name.username === cookies.user.username); // https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e/8217584#8217584
       // likedSong = song.likes.some(name => name.username === cookies.user.username);
    if(song.likes.length > 0) {likedSong = true;}
    let username = null;
    if (cookies.user) {username = cookies.user.username;}
    return (
        <li key={song['track_id']}>
            <span className='track'>
                <div className='trackName'>
                    {song['name']}
                </div>
                <div
                        className='like'
                        onClick={() => props.likeOnClick(username, song['track_id'], props.index)}
                        onMouseEnter={() =>setShowLikes(showLikes => showLikes=true)}
                        onMouseLeave={() => setShowLikes(showLikes => showLikes=false)}>
                            <ThumbsUp showLike={likedSong} className='thumbs-up'/>
                            <Likes likes={song['likes']} showLikes={showLikes} />
                </div>

            </span>
        </li>
    )};

export default function TrackList(props) {
    const [cookies]= useCookies(['user']);

    let username = null;
    if (cookies.user) {username = cookies.user.username;}


    const songs = props.songs;
    if(!songs) return null;
    
    const items = songs.map((song, index) => 
        <div className='tracks' key={index}>
            <Track
            song={song}
            index={index}
            likeOnClick={() => likeOnClick(username, song['track_id'], index, props.updateLike)}
            />
        </div>
    );

    return(
        <ul className='list-unstyled'>
            {items}
        </ul>
    )
}