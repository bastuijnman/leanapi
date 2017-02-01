'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

// Components
import { Paper, List, ListItem } from 'material-ui';
import { green500 } from 'material-ui/styles/colors';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles';

// Update styling to
githubGist.hljs.padding = '15px';
githubGist.hljs.margin = '0';

// Status code colors
let statusColors = {
    2: green500
}

module.exports = React.createClass({

    getInitialState() {
        let responses = this.props.responses,
            examples;

        if (!responses) {
            examples = [];
        } else {
            examples = responses[0].examples;
        }

        return {
            examples: examples
        }
    },

    render () {
        let responses;

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
                    <div style={{width: '75%', float: 'left'}}>
                        {this.state.examples.map((example) => (
                            <div>
                                <h3>{example.description}</h3>
                                <SyntaxHighlighter language='javascript' style={githubGist}>{example.body}</SyntaxHighlighter>
                            </div>
                        ))}
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
            </style>
        );
    }

});