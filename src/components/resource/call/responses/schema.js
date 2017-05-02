'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

/*
 * JSON Schema View library, it needs the JSON formatter library to
 * work. This adds an object to the window scope.
 */
import JSONFormatter from 'JSONFormatter';
import JSONSchemaView from 'JSONSchemaView';

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

        /*
         * We want to fire a resize event to toggle Dialog positioning.
         * This is a bit dirty, but there are no methods exposed on the
         * Dialog component to reposition it currently.
         */
        let toggleHandler = JSONSchemaView.prototype.toggle;
        JSONSchemaView.prototype.toggle = function () {
            toggleHandler.call(this);
            window.dispatchEvent(new Event('resize'));
        };

        if (node) {
            node.appendChild((new JSONSchemaView(jsonSchema, 1)).render())
        }
    }

    render () {
        return <div />;
    }

}