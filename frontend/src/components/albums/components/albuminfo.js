import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import '../styles/albuminfo.css';

function AlbumInfo(props) {
    const name = props.user.username;
    const year = new Date(props.date).getFullYear();
    const fullDate = new Date(props.date).toDateString();
    let albuminfo = '';
    if(window.innerWidth < 1000) {
        albuminfo = 'albuminfo';
    }
    return (
        <Accordion className={albuminfo}>
            <Card bg='dark' text='light' border='dark'>
                <Card.Header className='accordian'>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Album Info
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    Chosen By: {name}<br/>
                    Year: {year}<br/>
                    Full Date: {fullDate}<br/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default AlbumInfo;