import React from 'react';

import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const styles = theme => ({
    child: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class Nav extends React.Component {

    /**
     * Creates a new Nav component.
     *
     * @param {object} props - The component properties
     */
    constructor (props) {
        super(props);

        this.state = {
            activeHref: window.location.hash,
            open: []
        };

        this.onHashChangeBound = this.onHashChange.bind(this);
        this.onToggleChild = this.onToggleChild.bind(this);

        window.addEventListener('hashchange', this.onHashChangeBound);
    }

    componentWillUnmount () {
        window.removeEventListener('hashchange', this.onHashChangeBound);
        this.onHashChangeBound = null;
    }

    /**
     * Handles setting the correct active href when the window
     * hash changes (on navigation).
     *
     * This will break when not using the Hash route method.
     *
     * @todo Handle navigation within the Routes component
     */
    onHashChange () {
        this.setState({
            activeHref: window.location.hash
        });
    }

    onToggleChild (key) {
        return () => {
            let open = this.state.open.slice(0);
            let index = open.indexOf(key);

            if (index > -1) {
                open.splice(index, 1);
            } else {
                open.push(key);
            }

            this.setState({ open });
        };
    }

    /**
     * Renders the Nav component.
     */
    render () {
        const { resources, level, classes } = this.props;

        return (
            <List className={level > 0 ? classes.child : null} disablePadding={level > 0}>
                {resources.map(resource => [
                    <ListItem key={`${resource.name}-item`} component="a" href={`#${resource.url}`}>
                        <ListItemText primary={resource.name} />
                        {resource.children.length > 0 &&
                            <ExpandMore color="action" onClick={this.onToggleChild(resource.url)} />
                        }
                    </ListItem>,
                    resource.children.length ?
                    <Collapse
                        key={`${resource.name}-children`}
                        in={this.state.open.indexOf(resource.url) > -1}
                    >
                        <NavWithStyles resources={resource.children} level={level + 1} />
                    </Collapse> : null
                ])}
            </List>
        )
    }
}

Nav.defaultProps = {
    level: 0
};

const NavWithStyles = withStyles(styles)(Nav);
export default NavWithStyles;