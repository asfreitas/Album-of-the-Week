import React from 'react';
import { useCookies } from 'react-cookie';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import  Nav  from 'react-bootstrap/Nav';
import Login from '../components/login/login';
import Container from 'react-bootstrap/Container';
import '../styles/header.css';



  const Signin = () => {

    const [cookies, , removeCookie]= useCookies(['user']);
    const [loggedIn] = useCookies(['loggedin']);
      if(!cookies.user || !loggedIn.loggedin || cookies.user === undefined || !JSON.parse(loggedIn.loggedin)) {
          return(
              <div className='login float-end'>
                <Login/>
              </div>
          )
      }
      else {
          return(
                <NavDropdown
                    title={cookies.user.username}
                >
                    <NavDropdown.Item 
                    id='logout-button'
                    onClick={() => { removeCookie('user', {path: '/'});}}
                    >Logout
                    </NavDropdown.Item>
              </NavDropdown>



          )
      }
  }

const Navigator = () => {
    return(
            <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
                <Container fluid>
                    <Navbar.Toggle aria-controls='offcanvasNavbar' />
                    <Navbar.Collapse id='offcanvasNavbar'>
                    <Nav className="me-auto my-1 my-lg-0">
                        <NavbarBrand href='/albums/weekly'>Album of the Week</NavbarBrand>
                        <Nav.Link href='/'>Albums</Nav.Link>
                        <Nav.Link href='/year'>Year</Nav.Link>
                        <Nav.Link href='/search'>Add New Album</Nav.Link>
                    </Nav>
                    <Signin/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
)
}




const Navigation = () => {
    return (
        <Navigator/>
    );

}

export default Navigation;