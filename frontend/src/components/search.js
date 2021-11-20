import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SelectableAlbum from './albums/selAlbum';
import CardGroup from 'react-bootstrap/CardGroup';
import { generateAlbum, getAlbums} from '../helpers/searchHelper'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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
        this.state = {
            searchQuery: '',
            albums: undefined,
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
        const query = API_URL + '/backend/addNew?q=' + this.state.searchQuery;
        const res = await getAlbums(query, token);
        const albums = generateAlbum(res);
        this.setState({albums:undefined}) // albums were not updating when search again
        this.setState({albums: albums});
        this.forceUpdate();

    };
    componentDidMount() {
        document.title = "Find a New Album";
    }
    renderForm() {
        return (
            <Form className='searchBar' onSubmit={this.handleSubmit}>
                <Form.Control type='text'
                onChange={this.handleChange} placeholder='Search' />
              
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
                    <CardGroup className='AlbumGrid justify-content-start'>
                        {albums}
                    </CardGroup>
            </section>
        )
    }
}



export default withCookies(Search);