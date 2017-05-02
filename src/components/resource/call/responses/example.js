'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

// Components
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Schema from './schema';

// Update styling to
githubGist.hljs.padding = '15px';
githubGist.hljs.margin = '0';

class Example extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            jsonSchemaViewerOpen: false
        }
    }

    onHandleOpen () {
        this.setState({
            jsonSchemaViewerOpen: true
        });
    }

    onHandleClose () {
        this.setState({
            jsonSchemaViewerOpen: false
        });
    }

    render () {
        let example = this.props.example,
            openJsonSchemaButton = null,
            jsonSchemaDialog = null;

        if (example.jsonSchema) {
            openJsonSchemaButton = <RaisedButton className="schema-button" label="View schema" onTouchTap={this.onHandleOpen.bind(this)} />;
            jsonSchemaDialog = (
                <Dialog
                    title="JSON Schema viewer"
                    modal={false}
                    open={this.state.jsonSchemaViewerOpen}
                    onRequestClose={this.onHandleClose.bind(this)}
                    autoScrollBodyContent={true}
                    bodyStyle={{padding: '24px'}}
                >
                    <Schema jsonSchema={example.jsonSchema} />
                </Dialog>
            );
        }

        return (
            <CSSX styles={this.css()}>
                <h3>
                    {example.description}
                    {openJsonSchemaButton}
                </h3>
                <SyntaxHighlighter language='javascript' style={githubGist}>{example.body}</SyntaxHighlighter>
                {jsonSchemaDialog}
            </CSSX>
        );
    }

    css () {
        return (
            <style>
                .schema-button {
                    float: right;
                    margin-right: 2em;
                }
                h3:after {
                    content: "";
                    display: table;
                    clear: both;
                }
            </style>
        );
    }

};

module.exports = Example;