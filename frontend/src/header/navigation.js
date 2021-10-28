import React from 'react';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import  Nav  from 'react-bootstrap/Nav';
import Login from '../components/login/login';
import Logout from '../components/login/logout';

import '../styles/header.css';

function getWindowDimensions() { 
    const {innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }


  const Signin = () => {

    const [cookies]= useCookies(['user']);
    const [loggedIn] = useCookies(['loggedin']);
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

const MobileNavigator = () => {
    return(
    <Navbar className='navbar' collapseOnSelect expand="lg" bg='dark' variant='dark'>
    <Navbar.Brand href='/albums/weekly'>Album of the Week</Navbar.Brand>

    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
            <Nav.Link href='/'>Albums</Nav.Link>
            <Nav.Link href='/year'>Year</Nav.Link>
            <Nav.Link href='/search'>Add New Album</Nav.Link>
        </Nav>
        <Signin/>

    </Navbar.Collapse>

    </Navbar>
            )
}
const Navigator = () => {
    return(
    <Navbar className='navbar' collapseOnSelect expand="lg" bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='offcanvasNavbar' />
        <Navbar.Collapse id='offcanvasNavbar'>
        <Nav className='mr-auto'>
            <Nav.Link href='/albums/weekly'>Album of the Week</Nav.Link>
            <Nav.Link href='/'>Albums</Nav.Link>
            <Nav.Link href='/year'>Year</Nav.Link>
            <Nav.Link href='/search'>Add New Album</Nav.Link>
        </Nav>
        <Signin/>
        </Navbar.Collapse>
    </Navbar>)
}




const Navigation = () => {
    const { width } = useWindowDimensions();
    return (
        width < 768 ? <Navigator/> : <MobileNavigator/>
    );

}

export default Navigation;