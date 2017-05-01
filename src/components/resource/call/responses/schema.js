'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// Looks awful. Couldn't find a better way to do it at the moment, but there should be a better way
import './../../../../../node_modules/json-schema-view-js/bower_components/json-formatter-js/dist/bundle.js';
import JSONSchemaView from './../../../../../node_modules/json-schema-view-js/dist/bundle.min.js';

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