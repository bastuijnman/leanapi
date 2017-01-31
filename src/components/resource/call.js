'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';
import classNames from 'classnames';

// Components
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

// Internal Components
import Params from './call/params';
import Response from './call/response';
import Body from './call/body';

// Styling colors
import {
    lightGreen500,
    lightGreen50,
    red500,
    red50,
    amber500,
    amber50,
    lightBlue500,
    lightBlue50,
    teal500,
    teal50
} from 'material-ui/styles/colors';

// Don't use styling with tabs
Tabs.setUseDefaultStyles(false);

// Component
module.exports = React.createClass({

    getInitialState () {
        return {
            activeTabIndex: 0
        };
    },

    onTabSelect (index, previous) {
        this.setState({
            activeTabIndex: index
        });
    },

    render () {
        let call = this.props.call;
        let resource = this.props.resource;

        return (
            <CSSX styles={this.css()}>
                <div className="call-header">
                    <h2>
                        <span className={classNames('request', call.method.toLowerCase())}>{call.method}</span> {call.name}
                    </h2>
                    <p>{call.description}</p>
                </div>
                <Tabs onSelect={this.onTabSelect}>
                    <TabList>
                        <Tab><RaisedButton primary={this.state.activeTabIndex === 0}>Request</RaisedButton></Tab>
                        <Tab><RaisedButton primary={this.state.activeTabIndex === 1}>Response</RaisedButton></Tab>
                    </TabList>
                    <TabPanel>
                        <Params title="URI Parameters" params={resource.parameters} />
                        <Params title="Query Parameters" params={call.query} />
                        <Params title="Headers" params={call.headers} />
                        <Body bodies={call.body} />
                    </TabPanel>
                    <TabPanel>
                        {call.responses.map((response) => (<Response response={response} />))}
                    </TabPanel>
                </Tabs>
            </CSSX>
        );
    },

    css () {
        return (
            <style>
                .call-header {
                    border-top: 1px solid rgba(0,0,0,0.05);
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    background: rgba(0,0,0,0.03);
                    padding: 15px 15px 0 15px;
                    overflow: hidden;
                }

                .request {
                    display: inline-block;
                    padding: 5px 15px;
                    border-radius: 3px;
                    margin-right: 15px;
                }

                .request.get {
                    background: {{lightGreen500}};
                    color: {{lightGreen50}};
                }

                .request.delete {
                    background: {{red500}};
                    color: {{red50}};
                }

                .request.put {
                    background: {{amber500}};
                    color: {{amber50}};
                }

                .request.post {
                    background: {{lightBlue500}};
                    color: {{lightBlue50}};
                }

                .request.patch {
                    background: {{teal500}};
                    color: {{teal50}};
                }

                .body-select {
                    margin-left: 25px;
                }

                .ReactTabs__TabList {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    text-align: center;
                }

                .ReactTabs__Tab {
                    display: inline-block;
                }

                .ReactTabs__TabPanel {
                    padding: 15px 30px 15px 60px;
                }
            </style>
        );
    }

});