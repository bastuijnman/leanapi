'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

// Components
import { Paper, List, ListItem } from 'material-ui';
import { green500, orange500 } from 'material-ui/styles/colors';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import Example from './responses/example';
import Params from './params';

// Status code colors
const statusColors = {
    // 2XX status codes
    2: green500,

    // 4XX status codes
    4: orange500
}

export default class Responses extends React.Component {

    getExamples () {
        let responses = this.props.responses,
            examples;

        if (!responses || !responses.length) {
            examples = [];
        } else {
            examples = responses[this.state.activeResponseIndex].examples;
        }

        return examples;
    }

    getHeaders () {
        let responses = this.props.responses,
            examples;

        if (!responses || !responses.length) {
            examples = [];
        } else {
            examples = responses[this.state.activeResponseIndex].headers || [];
        }

        return examples;
    }

    constructor (props) {
        super(props);

        this.state = {
            activeResponseIndex: 0
        };
    }

    render () {
        let responses;

        if (!this.props.responses.length) {
            return null;
        }

        // Create list item with all responses
        responses = this.props.responses.map((response, index) => (
            <ListItem
                leftIcon={<RadioButtonChecked color={statusColors[response.code.substring(0, 1)]} />}
                primaryText={response.code}
                onClick={() => {
                    this.setState({
                        activeResponseIndex: index
                    });
                }}
            />
        ));

        return (
            <CSSX styles={this.css()}>
                <h2>Responses</h2>
                <Paper>
                    <div className="responses-nav">
                        <List>
                            {responses}
                        </List>
                    </div>
                    <div className="responses-content">
                        <Params title="Headers" params={this.getHeaders()} />

                        <h2>Bodies</h2>
                        {this.getExamples().map((example) => (<Example example={example} />))}
                    </div>
                    <div style={{clear:'both'}} />
                </Paper>
            </CSSX>
        );
    }

    css () {
        return (
            <style>
                h2 { padding-left: 15px; }
                h3 { padding-left: 15px; }

                .responses-nav {
                    width: 25%;
                    float: left;
                }

                .responses-content {
                    width: 75%;
                    float: left;
                    max-height: 500px;
                    overflow: scroll;
                }

                .params h2 {
                    padding-left: 0;
                }
            </style>
        );
    }

};