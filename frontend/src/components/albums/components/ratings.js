import React from 'react';
import StarRating from './stars';
import { useCookies } from 'react-cookie';



function Ratings(props) {
    const [cookies]= useCookies(['user']);
    const [loggedIn] = useCookies(['loggedin']);
    if(!cookies.user || !loggedIn.loggedin || !JSON.parse(loggedIn.loggedin) || !props.showStars) {
        return null;
    }

    const name = cookies.user.username;
    const ratings = props.ratings;
    const myRating = ratings.filter(rating => rating.user.username === name);
    const otherRatings = ratings.filter(rating => rating.user.username !== name);
    const rating = myRating.length === 0 ? 0 : myRating[0].rating;

    let currentTime = Date.now();
    let weekOf = new Date(props.weekOf);
    weekOf.setHours(weekOf.getHours() + weekOf.getTimezoneOffset()/60);
        return (
        <>
            <StarRating
            key={rating._id}
            onClick={props.updateStars}
            allowEditing={true}
            value={rating}
            size={'2x'}
            />
            {Number(currentTime) > Number(weekOf) &&
            <OtherRatings ratings={otherRatings}/>}
         </>
    )
}

function OtherRatings(props) {
    const ratings = props.ratings;
    const otherRatings = ratings.map((rating, index) =>
        <React.Fragment key={rating._id}>
            <h6>{rating.user.username}</h6>
            <StarRating
            allowEditing={false}
            value={rating.rating}
            size={'lg'}
            />
         </React.Fragment>
    );
    return (
        otherRatings
   );

}

export default Ratings;