import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumInfo from './components/albuminfo';
import Ratings from './components/ratings';
import TrackList from './components/tracks';
import { postData } from '../../helpers/fetch';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './styles/album.css';

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

    async updateStars(starsCount) {
        const { cookies } = this.props;
        const name = cookies.get('user').username;
        const data = setStarsData(name, this.props.album, starsCount);
        const url = API_URL + '/backend/ratings/addRating';
        await postData(url, undefined, data);
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
                <Card bg='dark' text='light' border='dark' className={`album ${this.props.albumClass} mx-auto`}>
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
        <Container fluid>
                <Row className='justify-content-sm-center' xs={1} sm={1} md={1} lg={2}>
                    <Col lg={9} className='ratings'>
                        <Ratings 
                            showStars={props.showStars}
                            className='stars'
                            updateStars={props.updateStars}
                            ratings={props.ratings}
                            weekOf={props.weekOf}
                            />

                    </Col>
                    <Col lg={3} className='albumInfo'>
                        <AlbumInfo 
                        user={props.user}
                        date={props.date}
                        />
                    </Col>
                </Row>
                <Row className='ratings'>
                <Card.Body className='body'>
                            <div className='info'>
                            </div>
                            <TrackList 
                            updateLike={props.updateLike}
                            updateDislike={props.updateDislike}
                            songs={props.songs}
                            />
                        </Card.Body>
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

function CoverArt(props){
    return(
        <Card.Img className={props.selectable} variant="top" src={props.cover}  />
    );
}

function setStarsData(name, album, starsCount) {
    const data = {
        username: name,
        album_id: album.album_id,
        rating: starsCount
    }
    const myRating = album.ratings.filter(rating => rating.user.username === name);
    if(myRating.length > 0) {
        data['_id'] = myRating[0]._id
    }
    return data;
}

export default withCookies(Album);