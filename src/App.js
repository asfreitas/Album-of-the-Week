import React, { Component } from "react";
import Header from "./frontend/components/header";
import List from "./frontend/components/albumlist";
class App extends Component {

    render() {
        return (
            <div>
            <Header />
            <List />
            </div>
        );
    }
}

export default App;