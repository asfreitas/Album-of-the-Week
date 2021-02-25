import React, { useState } from 'react';
import { likeOnClick, dislikeOnClick, Likes, Dislikes, ThumbsUp, ThumbsDown } from './likes';
import { useCookies} from 'react-cookie';


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
            dislikeOnClick={() => dislikeOnClick(cookies.user.username, song['track_id'], index, props.updateDislike)}

            />
        </div>
    );

    return(
        <ol className='tracks'>
            {items}
        </ol>
    )
}
function Track(props) {
    const [showLikes, setShowLikes] = useState(false);
    const [showDislikes, setShowDislikes] = useState(false);
    let song = props.song;

    const [cookies, setUsername, removeUsername]= useCookies(['user']);
    let dislikedSong = false;
    let likedSong = false;
    if(cookies.user) {
       // dislikedSong = song.dislikes.some(name => name.username === cookies.user.username); // https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e/8217584#8217584
       // likedSong = song.likes.some(name => name.username === cookies.user.username);
       if(song.dislikes.length > 0) {dislikedSong = true;}
       if(song.likes.length > 0) {likedSong = true;}

    }

    return (
        <li key={song['track_id']}>
            {song['name']}      
            <span
                onClick={() => props.likeOnClick(cookies.user.username, song['track_id'], props.index)}
                onMouseEnter={() =>setShowLikes(showLikes => showLikes=true)}
                onMouseLeave={() => setShowLikes(showLikes => showLikes=false)}>
                    <ThumbsUp showLike={likedSong} className='thumbs-up float-right'/>
                    <Likes likes={song['likes']} showLikes={showLikes} />
            </span>
            <span onClick={() => props.dislikeOnClick(cookies.user.username, song['track_id'], props.index)}
             onMouseEnter={() =>setShowDislikes(showDislikes => showDislikes=true)}
             onMouseLeave={() => setShowDislikes(showDislikes => showDislikes=false)}>
                <ThumbsDown showDislike={dislikedSong} className='thumbs-down float-right'/> 
                <Dislikes dislikes={song['dislikes']} showDislikes={showDislikes}/>
            </span>
        </li>
    )};

export default TrackList;