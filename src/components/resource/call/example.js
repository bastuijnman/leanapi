'use strict';

// Base libraries
import React from 'react';

// Components
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/styles/hljs'
import { Button, Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Schema from './schema';

// Update styling to
githubGist.hljs.padding = '15px';
githubGist.hljs.margin = '0';

const styles = theme => ({
    schemaButton: {
        float: 'right',
        marginRight: '2em'
    },
    dialogPaper: {
        padding: theme.spacing.unit * 4
    }
})

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

        const { classes } = this.props;

        if (example.jsonSchema) {
            openJsonSchemaButton = <Button variant='contained' classes={{ root: classes.schemaButton }} onClick={this.onHandleOpen.bind(this)}>View schema</Button>

            jsonSchemaDialog = (
                <Dialog
                    title="JSON Schema viewer"
                    open={this.state.jsonSchemaViewerOpen}
                    onClose={this.onHandleClose.bind(this)}
                    scroll='paper'
                    maxWidth="lg"
                    fullWidth
                    classes={{ paper: classes.dialogPaper }}
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
                {example.body ? <SyntaxHighlighter language='javascript' style={githubGist}>{example.body}</SyntaxHighlighter> : null}
                {jsonSchemaDialog}
            </div>
        );
    }

};

export default withStyles(styles)(Example);