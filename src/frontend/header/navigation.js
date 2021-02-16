import React from 'react';
import { useCookies } from 'react-cookie';
import Navbar from 'react-bootstrap/Navbar';
import  Nav  from 'react-bootstrap/Nav';
import Login from '../components/login/login';
import Logout from '../components/login/logout';
function Navigation() {
    const [cookies, setUsername, removeUsername]= useCookies(['user']);
    const [loggedIn, setLoggedIn, removeLoggedIn] = useCookies(['loggedin']);

    function checkLoggedIn() {
        if(cookies.user === undefined || !JSON.parse(loggedIn.loggedin)) {
            return(
            <Login/>
            )
        }
        else {
            return(
            <>
            <h1 style={{color:'white'}}>Hello {cookies.user.username}</h1>
                <Logout/>
            </>
            )
        }
    }
    
    return (
            <Navbar bg='dark' variant='dark'>
                <Navbar.Brand href='/albums/weekly'>Album of the Week</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/'>Albums</Nav.Link>
                    <Nav.Link href='/mypage'>My Page</Nav.Link>
                    <Nav.Link href='/search'>Add New Album</Nav.Link>
                </Nav>
                {checkLoggedIn()}
            </Navbar>
    );

}

export default Navigation;