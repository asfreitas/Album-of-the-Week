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
class Search extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        // instantiate cookies
        const { cookies } = props;

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
    handleSubmit(event) {
        event.preventDefault();
        const { cookies } = this.props;
        const token = cookies.get('token');
        const query = 'http://localhost:5001/search?q=' + this.state.searchQuery;
        (async () => {
            const res = await getAlbums(query, token);
            console.log(res);

            const newToken = res[1];
            console.log(newToken);
            cookies.set('token', newToken, { path: '/'})
            const albums = generateAlbum(res);
            this.setState({albums: albums});
        })();

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
        const { cookies } = this.props;
        console.log(cookies.get('token'));
        let albums = this.state.albums && this.state.albums.map(currentAlbum => (
            <SelectableAlbum album={currentAlbum} />));
        return (
            <section className='myinfo'>
                <div className='search'>
                    {this.renderForm()}
                </div>
                <div className='results'>
                    <CardDeck>
                        {albums}
                    </CardDeck>
                </div>
            </section>
        )
    }
}

export default withCookies(Search);