'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

// Components
import { Paper, List, ListItem } from 'material-ui';
import { green500, orange500 } from 'material-ui/styles/colors';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import Example from './responses/example';

// Status code colors
let statusColors = {
    // 2XX status codes
    2: green500,

    // 4XX status codes
    4: orange500
}

module.exports = React.createClass({

    getExamples () {
        let responses = this.props.responses,
            examples;

        if (!responses || !responses.length) {
            examples = [];
        } else {
            examples = responses[0].examples;
        }

        return examples;
    },

    render () {
        let responses;

        if (!this.props.responses.length) {
            return null;
        }

        // Create list item with all responses
        responses = this.props.responses.map((response) => (
            <ListItem
                leftIcon={<RadioButtonChecked color={statusColors[response.code.substring(0, 1)]} />}
                primaryText={response.code}
                onClick={() => {
                    this.setState({
                        examples: response.examples
                    });
                }}
            />
        ));

        return (
            <CSSX styles={this.css()}>
                <h2>Responses</h2>
                <Paper>
                    <div style={{width: '25%', float: 'left'}}>
                        <List>
                            {responses}
                        </List>
                    </div>
                    <div style={{width: '75%', float: 'left', maxHeight: '500px', overflow: 'scroll'}}>
                        {this.getExamples().map((example) => (<Example example={example} />))}
                    </div>
                    <div style={{clear:'both'}} />
                </Paper>
            </CSSX>
        );
    },

    css () {
        return (
            <style>
                h2 { padding-left: 15px; }
                h3 { padding-left: 15px; }
            </style>
        );
    }

});