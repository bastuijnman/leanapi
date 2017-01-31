'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

// Components
import Call from './resource/call';
import Params from './resource/call/params';

module.exports = React.createClass({

    render () {
        let resource = this.props.resource;

        let calls = resource.calls.map((call) => {
            return <Call call={call} resource={resource} />;
        });

        return (
            <CSSX styles={this.css()}>
                <div className="header">
                    <h1>{resource.url}</h1>
                    <p>{resource.description}</p>
                </div>

                <div className="calls">
                    {calls}
                </div>
            </CSSX>
        );
    },

    css () {
        return (
            <style>
            .header {
                border-top: 1px solid rgba(0,0,0,0.05);
                border-bottom: 1px solid rgba(0,0,0,0.05);
                padding: 15px 15px 0 15px;
                overflow: hidden;
                text-align: center;
            }
            </style>
        );
    }

});