'use strict';

// Base Libraries
import React from 'react';

// Components
import { Paper, RaisedButton, Popover, Menu, MenuItem } from 'material-ui';
import IconExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import { githubGist } from 'react-syntax-highlighter/dist/styles';
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

module.exports = React.createClass({

    /**
     * Get the initial state of the body component
     */
    getInitialState () {
        return {
            activeBody: 0,
            popoverOpen: false
        };
    },

    /**
     * Handle click for the body type selector
     *
     * @param {Event} evnt - The tap event
     */
    onButtonClick (evnt) {
        this.setState({
            popoverOpen: true,
            popoverAnchorEl: evnt.currentTarget
        });
    },

    /**
     * Handle close event for the popover
     */
    onRequestPopoverClose () {
        this.setState({
            popoverOpen: false
        });
    },

    /**
     * Handle change of body type
     *
     * @param {Event} evnt - The tap event
     * @param {MenuItem} menuItem - The tapped menu item
     */
    onChangeBody (evnt, menuItem) {
        this.setState({
            activeBody: parseInt(menuItem.key, 10)
        });

        // Close our popover after changing
        this.onRequestPopoverClose();
    },

    /**
     * Render the body component
     */
    render () {
        let bodies = this.props.bodies

        if (!bodies || bodies.length === 0) {
            return null;
        }

        return (
            <div>
                <h2 style={styles.h2}>
                    {this.props.title || 'Request body'}
                    <RaisedButton
                        style={styles.bodySwitcher}
                        label={bodies[this.state.activeBody].name}
                        labelPosition="before"
                        icon={<IconExpandMore />}
                        onTouchTap={this.onButtonClick}
                    >
                        <Popover
                            open={this.state.popoverOpen}
                            anchorEl={this.state.popoverAnchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.onRequestPopoverClose}
                        >
                            <Menu onItemTouchTap={this.onChangeBody}>
                                { bodies.map((body, bodyIndex) => (<MenuItem key={bodyIndex} primaryText={body.name} value={body.name} />)) }
                            </Menu>
                        </Popover>
                    </RaisedButton>
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

});