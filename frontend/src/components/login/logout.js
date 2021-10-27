import React from 'react';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';


const Logout = () => {
    const [ removeCookies ] = useCookies(['user']);
    const [loggedIn, setLoggedIn] = useCookies(['loggedin']);
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