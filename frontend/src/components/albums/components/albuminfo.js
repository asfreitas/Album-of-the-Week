import '../styles/albuminfo.css';

export default function AlbumInfo(props){
    const name = props.user.username;
    const fullDate = props.date;
    return (
        <h4 className='albuminfo'>
            Chosen By: {name}<p/>
            Release Year: {fullDate}
        </h4>

    );
}