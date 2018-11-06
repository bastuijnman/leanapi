'use strict';

// Base libraries
import React from 'react';
import { HashRouter as Router, Route, hashHistory } from 'react-router-dom';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import DefaultTheme from './themes/default';

// Components
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Internal components
import Home from './components/home';
import Resource from './components/resource';
import Nav from './components/nav';

import './app.css';

const drawerWidth = 256;
const styles = theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        width: `calc(100% - ${drawerWidth}px)`
    }
});

class App extends React.Component {

    constructor (props) {
        super(props);

        this._routes = (
            <Router history={hashHistory}>
                <div>
                    <Route path="/" exact component={() => (<Home api={this.state.api} />)} />
                    <Route path="/*" component={
                        (nextState) => {
                            const resource = this.getResourceByUrl(nextState.match.url);
                            if (resource) {
                                return <Resource key={resource} resource={resource} />;
                            }
                            return null;
                        }
                    } />
                </div>
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
        const { classes } = this.props;
        let api = this.state.api;

        if (api === null) {
            return null;
        }

        // Render actual application
        return (
            <MuiThemeProvider theme={DefaultTheme}>
                <div className={classes.root}>

                    <Drawer
                        classes={{ paper: classes.drawerPaper }}
                        className={classes.drawer}
                        open={this.state.menu}
                        variant="permanent"
                    >
                        <AppBar position="sticky">
                            <Toolbar>
                                <IconButton><MenuIcon /></IconButton>
                            </Toolbar>
                        </AppBar>
                        <Nav resources={api.resources} />
                    </Drawer>

                    <div className={classes.content}>
                        <AppBar position="sticky">
                            <Toolbar>
                                <IconButton><MenuIcon /></IconButton>
                            </Toolbar>
                        </AppBar>
                        {this._routes}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

};

export default withStyles(styles)(App);