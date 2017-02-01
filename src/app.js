'use strict';

// Base libraries
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import CSSX from 'react-cssx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DefaultTheme from './themes/default';

// Needed for material-ui
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// Components
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';

// Create the SelectableList component
const SelectableList = makeSelectable(List);

// Internal components
import Home from './components/home';
import Resource from './components/resource';

module.exports = React.createClass({

    _hashMap: {},

    getInitialState () {
        return {
            menu: true,
            api: null
        };
    },

    componentDidMount () {
        fetch('api.json').then((response) => {
            return response.json();
        }).then((api) => {
            this.setState({
                api: api
            });
        })
    },

    getResourceNav (resources) {
        return resources.map((resource) => {

            let children = this.getResourceNav(resource.children);
            let props = {
                primaryText: resource.name,
                value: resource.name,
                key: resource.name,
                href: '#' + resource.url
            };

            this._hashMap[resource.url] = resource;

            if (children.length > 0) {
                props.nestedItems = this.getResourceNav(resource.children);
                props.primaryTogglesNestedList = true;
            }

            return (
                <ListItem {...props} />
            );
        });
    },

    getResourceByUrl (url) {
        return this._hashMap[url];
    },

    onChangeNav () {
        // Test
    },

    onToggleMenu () {
        this.setState({
            menu: !this.state.menu
        });
    },

    render () {
        let api = this.state.api;

        if (api === null) {
            return null;
        }

        // Create resource navigation
        let list = this.getResourceNav(api.resources);

        // Render actual application
        return (
            <CSSX styles={this.css()}>
                <MuiThemeProvider muiTheme={DefaultTheme}>
                    <div>
                        <AppBar style={{position:'fixed'}} onLeftIconButtonTouchTap={this.onToggleMenu} />

                        <div className="page-content" style={{paddingLeft: this.state.menu ? '256px' : '0px'}}>
                            <Router history={hashHistory}>
                                <Route path="/" component={() => (<Home api={api} />)} />
                                <Route path="/*" component={
                                    (nextState, callback) => (
                                        <Resource resource={this.getResourceByUrl('/' + nextState.params.splat)} />
                                    )
                                } />
                            </Router>
                        </div>

                        <Drawer open={this.state.menu}>
                            <AppBar onLeftIconButtonTouchTap={this.onToggleMenu} />
                            <SelectableList onChange={this.onChangeNav}>{list}</SelectableList>
                        </Drawer>
                    </div>
                </MuiThemeProvider>
            </CSSX>
        );
    },

    css () {
        return (
            <style>
                .page-content {
                    padding: 64px 0 0 256px;
                }
            </style>
        );
    }

});