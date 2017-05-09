import React from 'react';

import { List, ListItem, makeSelectable } from 'material-ui/List';

// Create the SelectableList component
const SelectableList = makeSelectable(List);

export default class Nav extends React.Component {

    /**
     * Creates a new Nav component.
     *
     * @param {object} props - The component properties
     */
    constructor (props) {
        super(props);

        this.state = {
            activeHref: window.location.hash
        };

        this.onHashChangeBound = this.onHashChange.bind(this);
        window.addEventListener('hashchange', this.onHashChangeBound);
    }

    componentWillUnmount () {
        window.removeEventListener('hashchange', this.onHashChangeBound);
        this.onHashChangeBound = null;
    }

    /**
     * Creates an array of ListItem components which
     * reference the given resources.
     *
     * @param {array} resources - An array of all resources to create the Nav from
     * @returns {array} - An array of ListItem's
     */
    getNavItems (resources) {
        return resources.map((resource) => {

            let props = {
                primaryText: resource.name,
                value: resource.name,
                key: resource.name,
                href: '#' + resource.url
            };

            if (this.state.activeHref === props.href) {
                props.style = {
                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
                    background: 'rgba(0, 0, 0, 0.025)'
                }
            }

            if (resource.children.length > 0) {
                props.nestedItems = this.getNavItems(resource.children);
                props.primaryTogglesNestedList = true;
            }

            return (
                <ListItem {...props} />
            );
        });
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

    /**
     * Renders the Nav component.
     */
    render () {
        return (
            <SelectableList>
                {this.getNavItems(this.props.resources)}
            </SelectableList>
        )
    }


}