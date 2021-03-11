import React from 'react';
import { useCookies } from 'react-cookie';
import Navbar from 'react-bootstrap/Navbar';
import  Nav  from 'react-bootstrap/Nav';
import Login from '../components/login/login';
import Logout from '../components/login/logout';

import '../styles/header.css';
function Navigation() {
    const [cookies, setUsername, removeUsername]= useCookies(['user']);
    const [loggedIn, setLoggedIn, removeLoggedIn] = useCookies(['loggedin']);

    function checkLoggedIn() {

        if(!cookies.user || !loggedIn.loggedin || cookies.user === undefined || !JSON.parse(loggedIn.loggedin)) {
            return(
            <Login/>
            )
        }
        else {
            return(
            <>
            <h1 style={{color:'white'}}> {cookies.user.username}</h1>
                <Logout/>
            </>
            )
        }
    }
    
    return (
            <Navbar fixed='top' collapseOnSelect expand="lg" bg='dark' variant='dark'>
                <Navbar.Brand href='/albums/weekly'>Album of the Week</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/'>Albums</Nav.Link>
                        <Nav.Link href='/year'>Year</Nav.Link>
                        <Nav.Link href='/search'>Add New Album</Nav.Link>
                    </Nav>
                    {checkLoggedIn()}
                </Navbar.Collapse>

            </Navbar>
    );

}

export default Navigation;