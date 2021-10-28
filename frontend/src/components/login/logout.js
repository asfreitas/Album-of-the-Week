import React from 'react';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';


const Logout = () => {
    const [ , , removeCookie ] = useCookies(['user']);
    const [, setLoggedIn] = useCookies(['loggedin']);
    function handleClick() {
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