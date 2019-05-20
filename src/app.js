'use strict';

// Base libraries
import React from 'react';

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
            <div className="flex">
                <div className="w-3/12">NAV</div>
                <div className="w-5/12">CONTENT</div>
                <div className="w-4/12">RESPONSES</div>
            </div>
        );
    }

};

export default App;