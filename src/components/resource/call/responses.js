'use strict';

// Base libraries
import React from 'react';

// Components
import { Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import Example from './example';
import Params from './params';

// Status code colors
const statusColors = theme => ({
    // 2XX status codes
    status2: {
        color: green[500]
    },

    // 4XX status codes
    status4: {
        color: orange[500]
    }
});

const styles = {
    nav: {
        width: '25%',
        float: 'left'
    },
    content: {
        width: '75%',
        float: 'left',
        maxHeight: '500px',
        overflow: 'scroll',
    }
}

class Responses extends React.Component {

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
        const { classes } = this.props;

        if (!this.props.responses.length) {
            return null;
        }

        // Create list item with all responses
        responses = this.props.responses.map((response, index) => (
            <ListItem
                key={index}
                onClick={() => {
                    this.setState({
                        activeResponseIndex: index
                    });
                }}
                button
            >
                <ListItemIcon>
                    <RadioButtonChecked className={classes[`status${response.code.substring(0, 1)}`]} />
                </ListItemIcon>
                <ListItemText primary={response.code} />
            </ListItem>
        ));

        return (
            <div>
                <h2 style={{ paddingLeft: '15px' }}>Responses</h2>
                <Paper>
                    <div style={styles.nav}>
                        <List>
                            {responses}
                        </List>
                    </div>
                    <div style={styles.content}>
                        <Params title="Headers" params={this.getHeaders()} />

                        <h2 style={{ paddingLeft: '15px' }}>Bodies</h2>
                        {this.getExamples().map((example, index) => (<Example key={index} example={example} />))}
                    </div>
                    <div style={{clear:'both'}} />
                </Paper>
            </div>
        );
    }

};

export default withStyles(statusColors)(Responses);