import React, { Component } from "react";
import Header from "./header/header";
import List from "./components/albumlist";
import Search from './components/search';
import AddAlbum from './components/addAlbum'
import AlbumViewer from './components/albumViewer';
import Login from './components/login/login';
import WeeklyAlbum from './components/albumOfTheWeek';
import CurrentYear from './components/currentYear';
import {Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
class App extends Component {
    componentDidMount() {
        document.title = 'Album of the Week';
    }
    render() {
        return (
            <div className='root'>
            
              <Header/>
              <main className='pb-3 pt-5'>
                <Switch className='body'>
                    <Route exact path='/addalbum' component={AddAlbum}/>
                    <Route exact path='/albums/weekly' component={WeeklyAlbum} />
                    <Route exact path='/albums/:albumId' component={AlbumViewer} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/' component={List} /> 
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/year' component={CurrentYear}/>
                </Switch>
              </main>
              </div>
        );
    }
}// the '/' should always be last for the time being

export default App;