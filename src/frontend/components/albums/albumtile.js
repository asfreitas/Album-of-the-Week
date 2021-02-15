import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './styles/album.css';
import StarRating  from './components/stars';
import { likeOnClick, Likes, ThumbsUp, ThumbsDown } from '../albums/components/likes';
import {postData, putData } from '../../helpers/fetch';
class Album extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: props.album,
            stars: props.defaultStars || 0
        }
        this.updateLike = this.updateLike.bind(this);
        this.updateStars = this.updateStars.bind(this);

    }
    componentDidMount() {
        console.log(this.props);
    }
    updateStars(initialValue, starsCount) {
        const data = {
            username: 'Andrew',
            album_id: this.props.album.album_id,
            rating: starsCount
        }
        let url = 'http://localhost:5001/ratings/';
        console.log( data);
        if(initialValue === 0) {
            console.log(data);
            url += 'addRating';
            postData(url, undefined, data);
        }
        else { 
            url += 'updateRating'
            console.log(data);
            data['_id'] = this.props.album.ratings[0]._id
            putData(url, undefined, data);
        }
    }
    updateLike(index) {
        const newAlbum = this.state.album;
        let likes = newAlbum.tracks[index].likes;
        let newName = {'username':'Andrew'}; // need to change this to update for logged in user
        likes.push(newName);
        this.setState({album: newAlbum});
    }

    render() {
            return(
                <Card bg='dark' text='light' border='dark' className='album'>
                    <CoverArt  cover={this.state.album.cover} height={this.state.album.height} width={this.state.album.width} />
                    
                    {this.props.showStars && 
                        <Ratings className='stars' updateStars={this.updateStars} ratings={this.state.album.ratings}/>}
                    <Card.Body className='body'>
                        <div className='info'>
                            <Title title={this.state.album.title} />
                            <Artist artist={this.state.album.artist}/>
                            {this.props.link}
                        </div>
                        <TrackList updateLike={this.updateLike} songs={this.state.album.tracks}/>
                    </Card.Body>
                </Card>
        );
    }
}

function Ratings(props) {
    const rating = props.ratings === undefined && props.ratings[0].rating || 0;
    console.log(props.ratings[0].rating);
    return (
        <>
            <StarRating 
            onClick={props.updateStars}
            allowEditing={true}
            value={rating}
            />
            <OtherRatings ratings={props.ratings}/>
         </>
    )
}

function OtherRatings(props) {
    const ratings = props.ratings;
    return (
        ratings.map(function(rating) {
        <StarRating 
        allowEditing={false}
        value={rating}
         />
    }));

}
function Artist(props) {
    return (
        <Card.Subtitle className='artist'>{props.artist}</Card.Subtitle>
    );
}
function Title(props) {
    return (
        <Card.Text className='title'>{props.title}</Card.Text>
    )
}

function disLike(songId) {
    console.log(songId);
}
function TrackList(props) {
    const songs = props.songs;
    if(!songs) return null;
    const items = songs.map((song, index) => 
        <div key={index}>
            <Track song={song} index={index} click={() => likeOnClick(song['track_id'], index, props.updateLike)}/>
        </div>
    );

    return(
        <ol>
            {items}
        </ol>
    )
}
function Track(props) {
    const [showLikes, setShowLikes] = useState(false);
    let song = props.song;

    return (
        <li key={song['track_id']}>
            {song['name']} 
            <span
                onClick={() => props.click(song['track_id'], props.index)}
                onMouseEnter={() =>setShowLikes(showLikes => showLikes=true)}
                onMouseLeave={() => setShowLikes(showLikes => showLikes=false)}>
                    <ThumbsUp className='thumbs-up'/>
                    <Likes likes={song['likes']} showLikes={showLikes} />
            </span>
            <span onClick={() => disLike(song['track_id'])}>
                <ThumbsDown/> 
            </span>
        </li>
    )
}

function CoverArt(props){
    return(
        <Card.Img className='cover' variant="top" src={props.cover}  />
    );
}


export default Album;