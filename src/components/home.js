'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

module.exports = React.createClass({

    render () {
        let api = this.props.api;

        return (
            <CSSX styles={this.css()}>
                <div className="home">
                    <h1>{api.title}</h1>
                    <p>{api.description}</p>
                </div>
            </CSSX>
        );
    },

    css () {
        return (
            <style>
            .home {
                padding: 15px 30px 15px 60px;
            }
            </style>
        );
    }

});
