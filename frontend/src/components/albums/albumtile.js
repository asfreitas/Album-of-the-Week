import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumInfo from './components/albuminfo';
import Header from './components/albumheader';
import Ratings from './components/ratings';
import TrackList from './components/tracks';
import { postData } from '../../helpers/fetch';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './styles/album.css';

const API_URL = process.env.REACT_APP_API_URL;

const Body = props => {
    return (
        <Container fluid>
                <Row className='justify-content-sm-center' xs={1} sm={1} md={1} lg={2}>
                    <Col className='ratings'>
                        <Ratings 
                            showStars={props.showStars}
                            className='stars'
                            updateStars={props.updateStars}
                            ratings={props.ratings}
                            weekOf={props.weekOf}
                            />
                            <p/><hr/>
                        <AlbumInfo 
                            user={props.user}
                            date={props.date}
                        />
                        <hr/>
                    </Col>
                    <Col className='albumInfo'>

                    </Col>
                </Row>
                <Row className='ratings'>
                        <Card.Body className='tracks'>
                            <TrackList 
                                updateLike={props.updateLike}
                                songs={props.songs}
                            />
                        </Card.Body>
                </Row>
        </Container>
    )
}

function setStarsData(name, album, starsCount) {
    const data = {
        username: name,
        album_id: album.album_id,
        rating: starsCount
    }
    const myRating = album.ratings.filter(rating => rating.user && rating.user.username === name);
    if(myRating.length > 0) {
        data['_id'] = myRating[0]._id
    }
    return data;
}

class Album extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            album: props.album,
            stars: props.defaultStars || 0
        }
        console.log(this.state.album.title);
        this.updateLike = this.updateLike.bind(this);
        this.updateStars = this.updateStars.bind(this);
    }

    updateStars(starsCount) {
        const { cookies } = this.props;
        const name = cookies.get('user').username;
        const data = setStarsData(name, this.props.album, starsCount);
        const url = API_URL + '/backend/ratings/addRating';
        postData(url, undefined, data);
    }

    updateLike(index) {
        const newAlbum = this.state.album;
        let likes = newAlbum.tracks[index].likes;
        const { cookies } = this.props;
        const name = cookies.get('user').username;

        if(likes.filter(e => e.username === name).length > 0) {
            return;
        }
        let newName = {'username': name}; // need to change this to update for logged in user
        likes.push(newName);
        this.setState({album: newAlbum});
    }


    render() {
            return(
                <Card bg='dark' text='light' border='light' className={`album unClickable mx-auto`}>
                    <Header 
                        album={this.state.album}
                        albumClass='unClickable'
                    />
                    { this.props.showBody && <Body
                        weekOf={this.props.album.date}
                        showStars={this.props.showStars}
                        updateStars={this.updateStars}
                        ratings={this.state.album.ratings}
                        updateLike={this.updateLike}
                        updateDislike={this.updateDislike}
                        songs={this.state.album.tracks}
                        user={this.state.album.user}
                        date={this.state.album.releaseDate}
                    />}
                </Card>
        );
    }
}

export default withCookies(Album);