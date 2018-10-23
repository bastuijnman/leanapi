'use strict';

// Base libraries
import React from 'react';

// Components
import { Paper, List, ListItem } from 'material-ui';
import { green500, orange500 } from 'material-ui/styles/colors';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import Example from './example';
import Params from './params';

// Status code colors
const statusColors = {
    // 2XX status codes
    2: green500,

    // 4XX status codes
    4: orange500
}

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
                        {this.getExamples().map((example) => (<Example example={example} />))}
                    </div>
                    <div style={{clear:'both'}} />
                </Paper>
            </div>
        );
    }

};