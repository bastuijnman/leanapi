'use strict';

// Base libraries
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// API Context
import ApiContext from './context/api';

// Application components
import Navigation from './components/navigation';
import Introduction from './components/introduction';
import Resource from './components/resource';

// Application CSS (mostly tailwind)
import './app.css';

class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            api: null
        };
    }

    componentDidMount () {
        fetch('api.json').then((response) => {
            return response.json();
        }).then((api) => {
            this.setState({
                api: api
            });
        });
    }

    render () {
        const api = this.state.api;

        if (api === null) {
            return null;
        }

        // Render actual application
        return (
            <Router>
                <ApiContext.Provider value={api}>
                    <div className="flex">
                        <div className="w-3/12 min-h-screen bg-gray-300">
                            <Navigation api={api} />
                        </div>
                        <Route exact path="/" component={Introduction} />
                        <Route path="/:path" component={Resource} />
                    </div>
                </ApiContext.Provider>
            </Router>
        );
    }

};

export default App;