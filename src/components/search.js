import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

import {
    lightGreen,
    red,
    amber,
    lightBlue,
    teal
} from '@material-ui/core/colors';

const callMethodStyleMap = {
    get: {
        background: lightGreen[500],
        color: lightGreen[50]
    },
    delete: {
        background: red[500],
        color: red[50]
    },
    put: {
        background: amber[500],
        color: amber[50]
    },
    post: {
        background: lightBlue[500],
        color: lightBlue[50]
    },
    patch: {
        background: teal[500],
        color: teal[50]
    }
};

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        }
    },
    popper: {
        color: theme.palette.common.black
    },
    grow: {
        flexGrow: 1
    },
    chip: {
        height: '16px',
        fontSize: '0.4062rem',
        marginLeft: '5px'
    },

    // Colors for chips
    get: {
        backgroundColor: callMethodStyleMap.get.background,
        color: callMethodStyleMap.get.color
    },
    post: {
        backgroundColor: callMethodStyleMap.post.background,
        color: callMethodStyleMap.post.color
    },
    delete: {
        backgroundColor: callMethodStyleMap.delete.background,
        color: callMethodStyleMap.delete.color
    },
    put: {
        backgroundColor: callMethodStyleMap.put.background,
        color: callMethodStyleMap.put.color
    },
    patch: {
        backgroundColor: callMethodStyleMap.patch.background,
        color: callMethodStyleMap.patch.color
    },
    overlay: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0
    }
});

function ListItemLink (props) {
    return <ListItem button disableRipple disableTouchRipple component="a" {...props} />;
}

class Search extends React.Component {

    constructor (props) {
        super(props);

        this.suggestionsRef = React.createRef();
        this.onInputChange = this.onInputChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.state = {
            anchorEl: null,
            foundItems: []
        };
    }

    onInputChange (evnt) {
        const items = this.findUrlBasedOnValue(this.props.resources, evnt.target.value);

        this.setState({
            anchorEl: this.suggestionsRef.current,
            foundItems: items
        });

    }

    onBlur () {

        // Needed to give the browser a chance to follow the href after blur occurs
        setTimeout(() => {
            this.setState({
                anchorEl: null
            });
        }, 100);
    }

    onFocus (evnt) {
        this.setState({
            anchorEl: evnt.currentTarget
        });
    }

    findUrlBasedOnValue (resources, value) {
        return resources.reduce((acc, resource) => {
            return acc.concat({
                url: resource.url,
                methods: resource.calls.map(call => {
                    return call.method;
                })
            }, this.findUrlBasedOnValue(resource.children, value));
        }, []).filter(resource => {
            return resource.url.indexOf(value) > -1 && resource.methods.length > 0;
        }).slice(0, 9);
    }

    render () {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.search} ref={this.suggestionsRef}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>

                    <InputBase
                        placeholder="Search…"
                        onChange={this.onInputChange}
                        inputProps={{onBlur: this.onBlur, onFocus: this.onFocus}}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>
                {/*
                {this.state.anchorEl &&
                    <div onClick={this.onBlur} className={classes.overlay} />
                }
                */}
                <Popper
                    className={classes.popper}
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    placement='bottom-end'
                    disablePortal={true}
                >
                    <Paper>
                        <List>
                            {this.state.foundItems.map(item => {
                                return (
                                    <ListItemLink button
                                        key={item.url}
                                        href={`/#${item.url}`}
                                    >
                                        {item.url}
                                        <div className={classes.grow} />
                                        {item.methods.map(method => {
                                            return <Chip
                                                className={[
                                                    classes.chip,
                                                    classes[method.toLowerCase()]
                                                ]}
                                                key={method}
                                                label={method}
                                            />;
                                        })}
                                    </ListItemLink>
                                );
                            })}
                        </List>
                    </Paper>
                </Popper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Search);