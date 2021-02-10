import React, { Component } from "react";
import Header from "./frontend/components/header";
import List from "./frontend/components/albumlist";
import Search from './frontend/components/search';
import AddAlbum from './frontend/components/addAlbum';
import AlbumViewer from './frontend/components/albumViewer';
import {Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

    render() {
        return (
              <main>
                  <Header/>
                  <Switch>
                    <Route exact path='/addalbum' component={AddAlbum}/>
                    <Route exact path='/albums/:albumId' component={AlbumViewer} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/' component={List} /> 
                  </Switch>
              </main>
        );
    }
}// the '/' should always be last for the time being

export default App;