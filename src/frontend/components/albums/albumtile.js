import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './styles/album.css';
import StarRating  from './components/stars';
import { likeOnClick, Likes, ThumbsUp, ThumbsDown } from '../albums/components/likes';
import {postData, putData } from '../../helpers/fetch';
import { instanceOf } from 'prop-types';
import { useCookies, withCookies, Cookies } from 'react-cookie';
class Album extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
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
    }
    updateStars(initialValue, starsCount) {
        const { cookies } = this.props;
        const data = {
            username: cookies.get('user').username,
            album_id: this.props.album.album_id,
            rating: starsCount
        }
        let url = 'http://localhost:5001/ratings/';
        console.log( data);
        if(initialValue === 0) {
            url += 'addRating';
            postData(url, undefined, data);
        }
        else {
            const { cookies } = this.props;
            const name = cookies.get('user').username;
            const myRating = this.props.album.ratings.filter(rating => rating.user.username === name);
            url += 'updateRating'
            console.log(data);
            data['_id'] = myRating[0]._id
            putData(url, undefined, data);
        }
    }
    updateLike(index) {
        const newAlbum = this.state.album;
        let likes = newAlbum.tracks[index].likes;
        const { cookies } = this.props;
        const name = cookies.get('user').username;
        let newName = {'username': name}; // need to change this to update for logged in user
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
    const [cookies]= useCookies(['user']);
    const [loggedIn] = useCookies(['loggedin']);
    if(!loggedIn.loggedin){
        return;
    }
    const name = cookies.user.username;
    const ratings = props.ratings;
    const myRating = ratings.filter(rating => rating.user.username === name);
    const otherRatings = ratings.filter(rating => rating.user.username !== name);
    const rating = myRating.length === 0 ? 0 : myRating[0].rating;
    return (
        <>
            <h3>Your Rating:</h3>
            <StarRating
            key={rating._id}
            onClick={props.updateStars}
            allowEditing={true}
            value={rating}
            size={'lg'}
            />
            <OtherRatings ratings={otherRatings}/>
         </>
    )
}

function OtherRatings(props) {
    const ratings = props.ratings;
    const otherRatings = ratings.map((rating, index) =>
        <React.Fragment key={rating._id}>
            <h6>{rating.user.username}</h6>
            <StarRating
            allowEditing={false}
            value={rating.rating}
            size={'sm'}
            />
         </React.Fragment>
    );
    console.log(otherRatings);
    return (
        otherRatings
   );

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


export default withCookies(Album);