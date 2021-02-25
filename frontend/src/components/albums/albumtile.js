import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/album.css';
import StarRating  from './components/stars';
import { likeOnClick, dislikeOnClick, Likes, Dislikes, ThumbsUp, ThumbsDown } from '../albums/components/likes';
import {postData, putData } from '../../helpers/fetch';
import { instanceOf } from 'prop-types';
import { useCookies, withCookies, Cookies } from 'react-cookie';

const API_URL = process.env.REACT_APP_API_URL;


class Album extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        console.log(this.props.album);
        this.state = {
            album: props.album,
            stars: props.defaultStars || 0
        }
        this.updateLike = this.updateLike.bind(this);
        this.updateStars = this.updateStars.bind(this);
        this.updateDislike = this.updateDislike.bind(this);

    }

    updateStars(initialValue, starsCount) {
        const { cookies } = this.props;
        const data = {
            username: cookies.get('user').username,
            album_id: this.props.album.album_id,
            rating: starsCount
        }
        let url = API_URL + '/backend/ratings/';
        if(initialValue === 0) {
            url += 'addRating';
            postData(url, undefined, data);
        }
        else {
            const { cookies } = this.props;
            const name = cookies.get('user').username;
            const myRating = this.props.album.ratings.filter(rating => rating.user.username === name);
            url += 'updateRating'
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
    updateDislike(index) {
        const newAlbum = this.state.album;
        let dislikes = newAlbum.tracks[index].dislikes;
        const { cookies } = this.props;
        const name = cookies.get('user').username;
        let newName = {'username': name}; // need to change this to update for logged in user
        dislikes.push(newName);
        this.setState({album: newAlbum});
    }

    render() {
            return(
                <Card bg='dark' text='light' border='dark' className={`${this.props.albumClass} mx-auto`}>
                    <Header
                    artist={this.state.album.artist}
                    title={this.state.album.title}
                    className={this.props.albumClass}
                    />
                    <CoverArt
                     selectable={this.props.albumClass} 
                     cover={this.state.album.cover}
                     height={this.state.album.height} 
                     width={this.state.album.width} 
                     />
                     {this.props.selectable && this.props.link}
                    {!this.props.selectable &&
                    <Body
                    weekOf={this.props.album.date}
                    showStars={this.props.showStars}
                    updateStars={this.updateStars}
                    ratings={this.state.album.ratings}
                    updateLike={this.updateLike}
                    updateDislike={this.updateDislike}
                    songs={this.state.album.tracks}
                    user={this.state.album.user}
                    date={this.state.album.releaseDate}
                    showBody={this.props.showBody}
                    />}
                </Card>
        );
    }
}
function Body(props) {
    if(!props.showBody) {
        return null;
    }
    return (
               <Container>
                     <Row>
                        <Col lg={true} className='ratings'>
                            <Ratings 
                            showStars={props.showStars}
                            className='stars'
                            updateStars={props.updateStars}
                            ratings={props.ratings}
                            weekOf={props.weekOf}
                            />
                    <Card.Body className='body'>
                        <div className='info'>
                        </div>
                        <TrackList 
                        updateLike={props.updateLike}
                        updateDislike={props.updateDislike}
                        songs={props.songs}
                        />
                    </Card.Body>
                        </Col>
                        <Col className='albumInfo'>
                            <AlbumInfo 
                            user={props.user}
                            date={props.date}
                            />

                        </Col>
                     </Row>

                     </Container>
    )
}
function Header(props) {
    let name = '';
    if(props.artist.name) {
        name = props.artist.name;
    }
    else {
        name = props.artist;
    }
    return(
        <Card.Title className={`artistInfo ${props.className} `}
        >
           <h3>{props.title}</h3>
           <h6>by {name}</h6>
        </Card.Title>
    )
}
function Ratings(props) {
    const [cookies]= useCookies(['user']);
    const [loggedIn] = useCookies(['loggedin']);
    if(!cookies.user || !loggedIn.loggedin || !JSON.parse(loggedIn.loggedin) || !props.showStars) {
        return null;
    }

    const name = cookies.user.username;
    const ratings = props.ratings;
    const myRating = ratings.filter(rating => rating.user.username === name);
    const otherRatings = ratings.filter(rating => rating.user.username !== name);
    const rating = myRating.length === 0 ? 0 : myRating[0].rating;

    let currentTime = Date.now();
    let weekOf = new Date(props.weekOf);
    weekOf.setHours(weekOf.getHours() + weekOf.getTimezoneOffset()/60);
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
            {Number(currentTime) > Number(weekOf) &&
            <OtherRatings ratings={otherRatings}/>}
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
    return (
        otherRatings
   );

}
function AlbumInfo(props) {
    const name = props.user.username;
    const year = new Date(props.date).getFullYear();
    const fullDate = new Date(props.date).toDateString();
    return (
        <Accordion>
            <Card bg='dark' text='light' border='dark'>
                <Card.Header className='accordian'>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Album Info
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    Chosen By: {name}<br/>
                    Year: {year}<br/>
                    Full Date: {fullDate}<br/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

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
function CoverArt(props){
    return(
        <Card.Img className={props.selectable} variant="top" src={props.cover}  />
    );
}


export default withCookies(Album);