import React from 'react';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';


function Logout() {
    const [user, setCookies, removeCookies] = useCookies(['user']);
    const [loggedIn, setLoggedIn, removeLoggedIn] = useCookies(['loggedin']);
    function handleClick() {
        console.log(loggedIn.loggedin);
        removeCookies('user');
        setLoggedIn('loggedin', false, {path: '/'});
    }
    return (
        <>
            <Button onClick={handleClick}>Logout</Button>
        </>
    )
}

export default Logout;