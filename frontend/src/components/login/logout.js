import React from 'react';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';


const Logout = () => {
    const [ , , removeCookie ] = useCookies(['user']);
    const [loggedIn, setLoggedIn] = useCookies(['loggedin']);
    function handleClick() {
        console.log(loggedIn.loggedin);
        removeCookie('user', {path:'/'});
        setLoggedIn('loggedin', false, {path: '/'});
    }
    return (
        <>
            <Button onClick={handleClick}>Logout</Button>
        </>
    )
}

export default Logout;