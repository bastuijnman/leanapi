import React from 'react';
import { NavLink } from 'react-router-dom';

function stripSlashFromName(name) {
    return name.indexOf('/') === 0 ? name.substring(1) : name;
}

function SubNav ({ endpoints }) {
    return (
        <ul className="hidden nav-sub text-sm pl-4 text-gray-600">
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

function Navigation ({ api }) {
    const { resources } = api;

    return (
        <React.Fragment>
            <div className="p-4 pb-8">
                <input
                    type="text"
                    placeholder="Search API"
                    className="block w-full rounded text-md p-2 px-4 mt-5 outline-none focus:shadow-outline"
                />
            </div>

            <div className="pl-6 pb-8">
                <span className="font-semibold text-gray-600">Welcome</span>
                <NavLink
                    exact
                    className="block text-gray-600 hover:text-gray-800 hover:pl-1 transition-fast"
                    activeClassName="pl-1 border-l-2 text-gray-800 border-gray-800"
                    to="/"
                >
                    Introduction
                </NavLink>
            </div>

            <ul className="list-reset">
                <li className="pl-6 font-semibold text-gray-600">Reference</li>
                {resources.map(resource => (
                    <li key={resource.name} className="py-1 pl-6">
                        <NavLink
                            to={resource.url}
                            className="text-gray-600 hover:text-gray-800 hover:pl-1 transition-fast"
                            activeClassName="pl-1 border-l-2 text-gray-800 border-gray-800 nav-active"
                        >
                            {stripSlashFromName(resource.name)}
                        </NavLink>
                        <SubNav
                            endpoints={resource.children}
                        />
                    </li>
                ))}

            </ul>
        </React.Fragment>
    );

}

export default Navigation;