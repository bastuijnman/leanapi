'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import JSONSchemaView from 'json-schema-view-js';

export default class Schema extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            jsonSchema: props.jsonSchema
        };
    }

    componentDidMount () {
        let jsonSchema = this.state.jsonSchema;

        if (!jsonSchema) {
            return;
        }

        let node = ReactDOM.findDOMNode(this);

        if (node) {
            node.appendChild((new JSONSchemaView(JSON.parse(jsonSchema))).render())
        }
    }

    render () {
        return <div />;
    }

}