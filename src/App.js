import React, { Component } from "react";
import Header from "./frontend/header/header";
import List from "./frontend/components/albumlist";
import Search from './frontend/components/search';
import AddAlbum from './frontend/components/addAlbum';
import AlbumViewer from './frontend/components/albumViewer';
import Login from './frontend/components/login/login';
import WeeklyAlbum from './frontend/components/albumOfTheWeek';
import {Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
class App extends Component {

    render() {
        return (
              <main className='application'>
                  <Header/>
                  <Switch>
                    <Route exact path='/addalbum' component={AddAlbum}/>
                    <Route exact path='/albums/weekly' component={WeeklyAlbum} />
                    <Route exact path='/albums/:albumId' component={AlbumViewer} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/' component={List} /> 
                    <Route exact path='/login' component={Login}/>
                  </Switch>
              </main>
        );
    }
}// the '/' should always be last for the time being

export default App;