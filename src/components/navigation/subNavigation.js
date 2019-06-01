import React from 'react';
import { NavLink } from 'react-router-dom';

function SubNav ({ endpoints }) {
    return (
        <ul className="hidden nav-sub text-xs pl-4 text-gray-600">
            {endpoints.map(endpoint => (
            <li key={endpoint.url} className="my-2">
                <NavLink
                    to={endpoint.url}
                    activeClassName="text-gray-800 nav-active"
                >
                    {endpoint.name}
                </NavLink>
                {endpoint.children.length > 0 && <SubNav endpoints={endpoint.children} />}
            </li>
            ))}
        </ul>
    )
}

export default SubNav;