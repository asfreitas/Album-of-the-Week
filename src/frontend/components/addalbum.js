import React from 'react';
import {Redirect} from 'react-router-dom';
import UnclickableAlbum from './albums/UnclickableAlbum';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { insertAlbum } from '../helpers/albumHelper';
import '../styles/addalbum.css';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { getData } from '../helpers/fetch';

class AddAlbum extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            album: props.location.state.album,
            name: undefined,
            AOTW: false,
            users: undefined,
            loaded: false,
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    async componentDidMount() {
        const users = await getData('http://localhost:5001/users/getUsernames');
        this.setState({users: users, loaded: true, name: users[0].username})

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
    async handleSubmit(event) {
        event.preventDefault();
        let newAlbum = this.state.album;
        let user = this.state.name;
        newAlbum['user'] = user;
        newAlbum['isAlbumOfTheWeek'] = this.state.AOTW;
        const query = 'http://localhost:5001/albums/add';
        console.log(this.state.album);
        const { cookies } = this.props;
        const token = cookies.get('token');
        await insertAlbum(query, token, newAlbum);
        console.log("After insertion");
        this.setState({submitted: true})
    }
    renderForm() {
        return (
            this.state.loaded &&
            <Form onSubmit={this.handleSubmit}>
                <Form.Label>Who picked this album?</Form.Label>
                <Form.Control as='select' name='name' 
                onChange={this.handleSelect}
                value={this.state.name}>
                        <Users users={this.state.users}/>
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
        if(this.state.submitted) {
            const redirect = '/albums/' + this.state.album.album_id;
            console.log(redirect);
            return (
                <Redirect to={redirect}/>
            )
        }
        else {
            return (
                <section>
                    <div className='header'>
                        {this.renderTitle()}
                    </div>
                    <div className='viewable'>
                        <UnclickableAlbum showStars={false} album={this.state.album}/>
                    </div>
                    {this.renderForm()}
                </section>
            )
        }

    }

}
function Users(props) {
    const users = props.users;
    return users.map((user) =>
        <option key={user._id} onChange={props.handleChange} value={user.username}>{user.username}</option>
    );
}
export default withCookies(AddAlbum);