import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SelectableAlbum from './albums/selAlbum';
import CardDeck from 'react-bootstrap/CardDeck';
import { generateAlbum, getAlbums} from '../helpers/searchHelper'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import '../styles/albumgrid.css';
import '../components/albums/styles/album.css';
import '../styles/search.css';

const API_URL = process.env.REACT_APP_API_URL;

class Search extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        super(props);
        // instantiate cookies
        const { cookies } = this.props;
        console.log('hello')
        console.log(process.env.API_URL)
        console.log(cookies);
        this.state = {
            searchQuery: '',
            albums: undefined,
            token: cookies.get('token') || undefined
        };
        // function bindings
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
 
    handleChange(event) {
        this.setState({searchQuery: event.target.value})
    }
    async handleSubmit(event) {
        event.preventDefault();
        const { cookies } = this.props;
        const token = cookies.get('token');
        const query = API_URL + '/addNew?q=' + this.state.searchQuery;

        const res = await getAlbums(query, token);

        const newToken = res[1];
        cookies.set('token', newToken, { path: '/'})
        const albums = generateAlbum(res);
        this.setState({albums:undefined}) // albums were not updating when search again
        this.setState({albums: albums});
        this.forceUpdate();

    };
    renderForm() {
        return (
            <Form className='searchBar' onSubmit={this.handleSubmit}>
                <Form.Row >
                <Form.Control type='text'
                onChange={this.handleChange} placeholder='Search' />
                </Form.Row>
              
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }

    render () {
        let albums = this.state.albums && this.state.albums.map(currentAlbum => (
            <SelectableAlbum album={currentAlbum} addAlbum={true} />));
        return (
            <section className='searchMain'>
                    {this.renderForm()}
                    <CardDeck className='AlbumGrid'>
                        {albums}
                    </CardDeck>
            </section>
        )
    }
}

export default withCookies(Search);