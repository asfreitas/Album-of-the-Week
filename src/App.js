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
                    <Route path='/addalbum' component={AddAlbum}/>
                    <Route path='/albums/:albumId' component={AlbumViewer} />
                    <Route path='/search' component={Search} />
                    <Route path='/' component={List} /> 
                  </Switch>
              </main>
        );
    }
}// the '/' should always be last for the time being

export default App;