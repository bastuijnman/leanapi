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