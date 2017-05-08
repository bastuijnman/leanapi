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

// Internal components
import Home from './components/home';
import Resource from './components/resource';
import Nav from './components/nav';

import './app.css';

class App extends React.Component {

    constructor (props) {
        super(props);

        this._routes = (
            <Router history={hashHistory}>
                <Route path="/" component={() => (<Home api={this.state.api} />)} />
                <Route path="/*" component={
                    (nextState, callback) => {
                        return <Resource key={nextState.params.splat} resource={this.getResourceByUrl('/' + nextState.params.splat)} />;
                    }
                } />
            </Router>
        );

        this._hashMap = {};
        this.state = {
            menu: true,
            api: null
        };
    }

    setupHashMap (resources) {
        resources.forEach((resource) => {
            this._hashMap[resource.url] = resource;

            if (resource.children && resource.children.length > 0) {
                this.setupHashMap(resource.children);
            }
        })
    }

    componentDidMount () {
        fetch('api.json').then((response) => {
            return response.json();
        }).then((api) => {
            this._hashMap = {};
            this.setupHashMap(api.resources);

            this.setState({
                api: api
            });
        });
    }

    getResourceByUrl (url) {
        return this._hashMap[url];
    }

    onToggleMenu () {
        this.setState({
            menu: !this.state.menu
        });
    }

    render () {
        let api = this.state.api;

        if (api === null) {
            return null;
        }

        // Render actual application
        return (
            <CSSX styles={this.css()}>
                <MuiThemeProvider muiTheme={DefaultTheme}>
                    <div>
                        <AppBar style={{position:'fixed'}} onLeftIconButtonTouchTap={this.onToggleMenu} />

                        <div className="page-content" style={{paddingLeft: this.state.menu ? '256px' : '0px'}}>
                            {this._routes}
                        </div>

                        <Drawer open={this.state.menu}>
                            <AppBar onLeftIconButtonTouchTap={this.onToggleMenu} />
                            <Nav resources={api.resources} />
                        </Drawer>
                    </div>
                </MuiThemeProvider>
            </CSSX>
        );
    }

    css () {
        return (
            <style>
                .page-content {
                    padding: 64px 0 0 256px;
                }
            </style>
        );
    }

};

module.exports = App;