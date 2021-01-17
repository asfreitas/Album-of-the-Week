import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Album from './albumtile';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class AddAlbum extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            searchQuery: '',
            albums: undefined,
            token: cookies.get('token')
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateAlbum = this.generateAlbum.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    generateAlbum(fullAlbums) {
        const info = fullAlbums[0];
        const tracks = fullAlbums[1];
        let albums = [];
        for(let j=0; j < fullAlbums[0].length; j++)
        {
            let album = new Object();
            let images = info[j]['images']
    
            album.cover = info[j]['images'][0]['url']
            album.height = info[j]['images'][0]['height']
            album.width = info[j]['images'][0]['width']
            album.title = info[j]['name'];
            album.tracks = undefined
            album.artist = info[j]['name'];
            albums.push(album);
        }
        console.log(albums);
        /*
        let tracksArray = [];
        for(var i = 0; i < tracks.items.length; i++) {
            tracksArray.push(tracks.items[i].name);
        }
        album.tracks = tracksArray;

        console.log(album.tracks);
        */
 
        return albums;

    }
    handleChange(event) {
        this.setState({searchQuery: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault();
        //console.log(this.state.searchQuery)
        const query = 'http://localhost:5000/search?q=' + this.state.searchQuery;
        fetch(query , {
            method: 'GET',
          //  body: data,
        })
        .then(result => result.json())
        .then(
            res => {
                const albums = this.generateAlbum(res)
                this.setState({albums: albums})
            })
        .catch(e => console.log(e));
    };
    renderForm() {
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Control size='leg' type='text'
            onChange={this.handleChange} placeholder='Search' />
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
        )
    }


    render () {
        let albums = this.state.albums && this.state.albums.map(currentAlbum => (
            <Album album={currentAlbum} />));
        return (
            <section className='addalbum'>
                <div className='search'>
                    {this.renderForm()}
                </div>
                <div className='results'>
                    {albums}
                </div>
            </section>
        )
    }
}

export default AddAlbum;