'use strict';

// Base Libraries
import React from 'react';

// Components
import { Paper, Button, Menu, MenuItem } from '@material-ui/core';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import { githubGist } from 'react-syntax-highlighter/styles/hljs'
import Example from './example';

// Update styling to
githubGist.hljs.padding = '15px';
githubGist.hljs.margin = '0';

const styles = {
    h2: {
        paddingLeft: '15px'
    },
    bodySwitcher: {
        marginLeft: '45px'
    }
};

class Body extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            activeBody: 0,
            popoverAnchorEl: null
        };

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onRequestPopoverClose = this.onRequestPopoverClose.bind(this);
    }

    /**
     * Handle click for the body type selector
     *
     * @param {Event} evnt - The tap event
     */
    onButtonClick (evnt) {
        this.setState({
            popoverAnchorEl: evnt.currentTarget
        });
    }

    /**
     * Handle close event for the popover
     */
    onRequestPopoverClose () {
        this.setState({
            popoverAnchorEl: null
        });
    }

    /**
     * Handle change of body type
     *
     * @param {Event} evnt - The tap event
     * @param {MenuItem} bodyIndex - The tapped menu item
     */
    onChangeBody (bodyIndex) {

        return () => {
            this.setState({
                activeBody: bodyIndex
            });

            // Close our popover after changing
            this.onRequestPopoverClose();
        }
    }

    /**
     * Render the body component
     */
    render () {
        let bodies = this.props.bodies
        const { popoverAnchorEl } = this.state;

        if (!bodies || bodies.length === 0) {
            return null;
        }

        return (
            <div>
                <h2 style={styles.h2}>
                    {this.props.title || 'Request body'}
                    <Button
                        style={styles.bodySwitcher}
                        onClick={this.onButtonClick}
                        variant="contained"
                    >
                        {bodies[this.state.activeBody].name}
                        <IconExpandMore />
                    </Button>
                    <Menu
                        open={Boolean(popoverAnchorEl)}
                        anchorEl={popoverAnchorEl}
                        onClose={this.onRequestPopoverClose}
                    >
                        { bodies.map((body, bodyIndex) => (
                            <MenuItem
                                onClick={this.onChangeBody(bodyIndex)}
                                key={bodyIndex}
                            >
                                {body.name}
                            </MenuItem>)
                        )}
                    </Menu>
                </h2>
                <Paper>
                    {bodies.map((body, index) => {
                        let styles = index === this.state.activeBody ? {} : { display: 'none' };

                        return (
                            <div style={styles} key={index}>
                                <Example example={{

                                    // For now transform the body into an example object
                                    description: body.description,
                                    body: body.example,
                                    jsonSchema: body.jsonSchema
                                }} />
                            </div>
                        );
                    })}
                </Paper>
            </div>
        );
    }

}

export default Body;