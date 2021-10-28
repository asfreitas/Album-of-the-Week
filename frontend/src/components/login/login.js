import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { getData } from '../../helpers/fetch';

const API_URL = process.env.REACT_APP_API_URL;

class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: undefined,
            password: undefined
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const url = API_URL + '/backend/users/login';
        const headers = {
            'content': 'form',
            'username': this.state.username,
            'password': this.state.password,
            'method': 'GET'
        }
        const username = await getData(url, headers);
        const { cookies } = this.props;
        cookies.set('user', username, {path:'/'});
        cookies.set('loggedin', true, {path:'/'});
    }
    handleChange(event) {
        const target = event.target;
        if(target.name === 'username') {
            this.setState({username: target.value})
        }
        else {
            this.setState({password: target.value})
        }
    }

    render () {
        return (
            <Form inline onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Row>
                    <Col>
                        <Form.Control size='leg'
                        type='text'
                        onChange={this.handleChange} 
                        placeholder='username'
                        name='username'
                        />
                    </Col>
                    <Col>
                        <Form.Control size='leg'
                        type='text'
                        onChange={this.handleChange} 
                        placeholder='password'
                        name='password'
                    />
                    </Col>
                    <Col>
                        <Button variant='primary' type='submit'>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default withCookies(Login);