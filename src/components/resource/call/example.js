'use strict';

// Base libraries
import React from 'react';

// Components
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Schema from './schema';

// Update styling to
githubGist.hljs.padding = '15px';
githubGist.hljs.margin = '0';

const styles = {
    schemaButton: {
        float: 'right',
        marginRight: '2em'
    }
}

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
            openJsonSchemaButton = <RaisedButton style={styles.schemaButton} label="View schema" onTouchTap={this.onHandleOpen.bind(this)} />;
            jsonSchemaDialog = (
                <Dialog
                    title="JSON Schema viewer"
                    modal={false}
                    open={this.state.jsonSchemaViewerOpen}
                    onRequestClose={this.onHandleClose.bind(this)}
                    autoScrollBodyContent={true}
                    bodyStyle={{padding: '24px'}}
                    contentStyle={{maxWidth:'auto', width: '85%'}}
                >
                    <Schema jsonSchema={example.jsonSchema} />
                </Dialog>
            );
        }

        return (
            <div>
                <h3>
                    {example.description}
                    {openJsonSchemaButton}
                </h3>
                <div style={{clear: 'both'}} />
                <SyntaxHighlighter language='javascript' style={githubGist}>{example.body}</SyntaxHighlighter>
                {jsonSchemaDialog}
            </div>
        );
    }

};

module.exports = Example;