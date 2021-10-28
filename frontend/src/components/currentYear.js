import React from 'react';
import AlbumList from './albumlist';
import { getData } from '../helpers/fetch';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/currentYear.css';

const API_URL = process.env.REACT_APP_API_URL;

class CurrentYear extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            years : undefined,
            year: undefined,
            showNewYear: false
        }
        this.setNewYear = this.setNewYear.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        const year_URL = API_URL + '/backend/album/getYears';
        const date_URL = API_URL + '/backend/album/getWeeklyAlbum';
        let years = await getData(year_URL);
        years.sort();
        const date = await getData(date_URL);
        const releaseDate = new Date(date.releaseDate).getFullYear();
        this.setState({years:years})
        this.setState({year:releaseDate})
    }
    setNewYear() {
        this.setState({showNewYear:true})
    }
    handleChange(event) {
        this.setState({
            year: event.target.value
        })

    }
    render() {
        console.log(this.state.year);
        return(
            <>
            <div className='getNewYear'>
                <Button
                onClick={this.setNewYear}>
                    Get a new year
                </Button>
                <GetNewYear showYear={this.state.showNewYear} dates={this.state.years}/>
            </div>
                <Form className='dateSelect'>
                    <Form.Control
                    as='select'
                    name='years'
                    onChange={this.handleChange}
                    value={this.state.year}>
                        
                        <Years
                         year={this.state.year} 
                         years={this.state.years}
                         />
                    </Form.Control>
                </Form>
                <AlbumList 
                currentYear={true} 
                year={this.state.year} 
                />
            </>
        )
    }
}
function Years(props) {
    let years = null;
    if(props.years === undefined)
        return years
    else {
        years = props.years.map(function(year,index) {

            return (
                <option
                key={year} 
                onChange={props.handleChange} 
                value={year}
                >{year}
               
                </option>
            )

        });
    }
    return years;

}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
function GetNewYear(props) {
    if(!props.showYear) {
        return null;
    }
    if(!props.dates)
        return null;

    const year = getRandomYear(props.dates);
    return (
        <h4>{year}</h4>
    );
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomYear(oldYears) {
    let range = (start, stop, step) => Array.from({length:(stop-start) / step + 1}, (_,i) => start + (i*step));
    let array = range(1965,2021, 1).filter(value => !oldYears.includes(value));

    return(array[getRandomInt(array.length)])

}

export default CurrentYear;