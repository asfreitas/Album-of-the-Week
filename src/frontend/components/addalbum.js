import React from 'react';
import ViewableAlbum from './albums/viewAlbum';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getTracks, insertAlbum, getGenre } from '../helpers/albumHelper';
import '../styles/addalbum.css';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';


class AddAlbum extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = {
            album: props.location.state.album,
            name: undefined,
            AOTW: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    renderTitle() {
        return (
            <h1 className='text-center'>Add {this.state.album.title} to the list?</h1>
        )
    }
    handleSelect(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleCheck(event) {
        this.setState({
            AOTW: event.target.checked
        });
        console.log(this.state.name);
   
    }
    handleSubmit(event) {
        event.preventDefault();
        let newAlbum = this.state.album;
        let user = this.state.name;
        let isItTheAlbum = this.state.AOTW;
        console.log(user);
        newAlbum['user'] = user;
        newAlbum['isAlbumOfTheWeek'] = isItTheAlbum;
        const query = 'http://localhost:5001/albums/add';
        console.log(this.state.album);
        const { cookies } = this.props;
        const token = cookies.get('token');
        (async () => {

            const res2 = await insertAlbum(query, token, newAlbum);
        })();
    }
    renderForm() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Label>Who picked this album?</Form.Label>
                <Form.Control as='select' name='name' 
                onChange={this.handleSelect}
                value={this.state.name}>
                    <option value='Andrew'>Andrew</option>
                    <option value='John'>John</option>
                    <option value='Peter'>Peter</option>
                    <option value='Stephen'>Stephen</option>
                </Form.Control>
                <Form.Check
                name="isAlbumOfTheWeek"
                label="This is the album of the week"
                onChange={this.handleCheck}
                >

                </Form.Check>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        );
    }

    render () {
        return (
            <section>
                <div className='header'>
                    {this.renderTitle()}
                </div>
                <div className='viewable'>
                    <ViewableAlbum album={this.state.album}/>
                </div>
                {this.renderForm()}
            </section>
        )
    }

}

export default withCookies(AddAlbum);