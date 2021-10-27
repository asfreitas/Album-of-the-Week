import '../styles/albuminfo.css';

function AlbumInfo(props) {
    const name = props.user.username;
    const fullDate = new Date(props.date).toDateString();
    return (
        <h4 className='albuminfo'>
            Chosen By: {name}<p/>
            Release Date: {fullDate}
        </h4>

    );
}

export default AlbumInfo;