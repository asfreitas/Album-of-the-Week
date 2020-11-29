import React, { Component } from "react";
import Header from "./frontend/components/header";
import List from "./frontend/components/albumlist";
import AddAlbum from './frontend/components/addalbum';
import {Route, BrowserRouter, Switch } from 'react-router-dom'

class App extends Component {

    render() {
        return (
              <main>
                  <Header/>
                  <Switch>
                    <Route path='/addalbum' component={AddAlbum} />
                      <Route path='/' component={List} />
                  </Switch>
              </main>
        );
    }
}

export default App;