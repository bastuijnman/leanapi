'use strict';

// Base libraries
import React from 'react';

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
            <div>V2 LAYOUT</div>
        );
    }

};

export default App;