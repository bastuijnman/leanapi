'use strict';

// Base libraries
import React from 'react';

// Internal Components
import Params from './call/params';
import Body from './call/body';
import Responses from './call/responses';

// Styling colors
import {
    lightGreen500,
    lightGreen50,
    red500,
    red50,
    amber500,
    amber50,
    lightBlue500,
    lightBlue50,
    teal500,
    teal50
} from 'material-ui/styles/colors';

const callHeaderStyle = {
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    background: 'rgba(0,0,0,0.03)',
    padding: '15px 15px 0 15px',
    overflow: 'hidden'
};

const callMethodStyleMap = {
    get: {
        background: lightGreen500,
        color: lightGreen50
    },
    delete: {
        background: red500,
        color: red50
    },
    put: {
        background: amber500,
        color: amber50
    },
    post: {
        background: lightBlue500,
        color: lightBlue50
    },
    patch: {
        background: teal500,
        color: teal50
    }
}

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