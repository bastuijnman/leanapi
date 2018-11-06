'use strict';

// Base libraries
import React from 'react';

// Internal Components
import Params from './call/params';
import Body from './call/body';
import Responses from './call/responses';

// Styling colors
import {
    lightGreen,
    red,
    amber,
    lightBlue,
    teal
} from '@material-ui/core/colors';

const callHeaderStyle = {
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    background: 'rgba(0,0,0,0.03)',
    padding: '15px 15px 0 15px',
    overflow: 'hidden'
};

const callMethodStyleMap = {
    get: {
        background: lightGreen[500],
        color: lightGreen[50]
    },
    delete: {
        background: red[500],
        color: red[50]
    },
    put: {
        background: amber[500],
        color: amber[50]
    },
    post: {
        background: lightBlue[500],
        color: lightBlue[50]
    },
    patch: {
        background: teal[500],
        color: teal[50]
    }
};

const getCallMethodStyle = (method) => {
    return Object.assign({
        display: 'inline-block',
        padding: '5px 15px',
        borderRadius: '3px',
        marginRight: '15px'
    }, callMethodStyleMap[method]);
};

// Component
export default class Call extends React.Component {

    render () {
        let call = this.props.call;
        let resource = this.props.resource;

        return (
            <div>
                <div style={callHeaderStyle}>
                    <h2>
                        <span style={getCallMethodStyle(call.method.toLowerCase())}>{call.method}</span> {call.name}
                    </h2>
                    <p>{call.description}</p>
                </div>

                <Params title="Path Parameters" params={resource.parameters} />
                <Params title="Query Parameters" params={call.query} />
                <Params title="Headers" params={call.headers} />
                <Body bodies={call.body} />
                <Responses responses={call.responses} />
            </div>
        );
    }

};