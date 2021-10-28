import Card from 'react-bootstrap/Card';

function Title(props) {
    let name = '';
    if(props.artist.name) {
        name = props.artist.name;
    }
    else {
        name = props.artist;
    }
    return(
        <Card.Title 
            className={`artistInfo ${props.className} `}
        >
           <h3>{props.title}</h3>
           <h6>{name}</h6>
        </Card.Title>
    )
}

function CoverArt(props) {
    return(
        <Card.Img className={props.selectable} variant='top' src={props.cover}  />
    );
}
function Header(props) {
    return(
        <>
            <Title
                artist={props.album.artist}
                title={props.album.title}
                className={props.albumClass}
            />
            <CoverArt
                selectable={props.albumClass}
                cover={props.album.cover}
                height={props.album.height}
                width={props.album.width}
            />
            </>
    )
}
export default Header;