'use strict';

// Base libraries
import React from 'react';

export default class Home extends React.Component {

    render () {
        let api = this.props.api;

        return (
            <div className="home" style={{padding: '15px 30px 15px 60px'}}>
                <h1>{api.title}</h1>
                <p>{api.description}</p>
            </div>
        );
    }

};
