'use strict';

// Base libraries
import React from 'react';

// Components
import Call from './resource/call';

const headerStles = {
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    padding: '15px 15px 0 15px',
    overflow: 'hidden',
    textAlign: 'center',
}

export default class Resource extends React.Component {

    render () {
        let resource = this.props.resource;

        let calls = resource.calls.map((call) => {
            return <Call key={call.method + call.name} call={call} resource={resource} />;
        });

        return (
            <div>
                <div style={headerStles}>
                    <h1>{resource.url}</h1>
                    <p>{resource.description}</p>
                </div>
                <div>
                    {calls}
                </div>
            </div>
        )
    }

};