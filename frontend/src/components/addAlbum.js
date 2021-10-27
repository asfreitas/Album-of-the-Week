import React from 'react';
import {Redirect} from 'react-router-dom';
//import UnclickableAlbum from './albums/UnclickableAlbum';
import Album from './albums/albumtile';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { insertAlbum } from '../helpers/albumHelper';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { getData } from '../helpers/fetch';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './albums/styles/album.css';
import '../styles/addalbum.css';

const API_URL = process.env.REACT_APP_API_URL;


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
            submitted: false,
            date: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }
    async componentDidMount() {
        const url = API_URL + '/backend/users/getUsernames';
        const users = await getData(url);
        this.setState({users: users, loaded: true, name: users[0].username})

    }

    handleSelect(event) {
        this.setState({
            name: event.target.value
        });
        
    }
    handleDate(date) {
        this.setState({
            date: date
        })
        console.log(this.state.date);
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
        newAlbum['date'] = this.state.date;
        const query = API_URL + '/backend/album/add';
        console.log(this.state.album);
        const { cookies } = this.props;
        const token = cookies.get('token');
        await insertAlbum(query, token, newAlbum);
        console.log("I'm here");
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
                selected={this.state.date}
                className='checkBox'
                name="isAlbumOfTheWeek"
                label="This is the album of the week"
                onChange={this.handleCheck}
                />
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        );
    }

    render () {
        if(this.state.submitted) {
            const redirect = '/albums/' + this.state.album.album_id;
            return (
                <Redirect to={redirect}/>
            )
        }
        else {
            return (
                <>
                    <Album showBody={false} showStars={false} album={this.state.album}/>
                    <div className='mainForm'>
                        {this.renderForm()}
                        <PickDate selected={this.state.date} handleDateChange={this.handleDate}/>

                    </div>                
                </>
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

function PickDate(props) {
    return (
        <DatePicker
            selected={props.selected}
            onChange={props.handleDateChange}
            showTimeSelect
            dateFormat="Pp"
        />
    )
}
export default withCookies(AddAlbum);