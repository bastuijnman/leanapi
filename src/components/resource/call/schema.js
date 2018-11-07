'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import JSONSchemaView from '../../../../node_modules/json-schema-view-js/dist/bundle.js';

export default class Schema extends React.Component {

    componentDidMount () {
        let jsonSchema = this.props.jsonSchema;

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

    componentDidUpdate () {
        let jsonSchema = this.props.jsonSchema;

        if (!jsonSchema) {
            return;
        }

        let node = ReactDOM.findDOMNode(this);

        if (node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }

            node.appendChild((new JSONSchemaView(jsonSchema, 1)).render())
        }
    }

    render () {
        return <div />;
    }

}