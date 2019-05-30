import React from 'react';
import { Link } from 'react-router-dom';

function stripSlashFromName(name) {
    return name.indexOf('/') === 0 ? name.substring(1) : name;
}

function Navigation ({ api }) {

    const { resources } = api;

    return (
        <React.Fragment>
            <div className="p-4 pb-8">
                <input
                    type="text"
                    placeholder="Search API"
                    className="block w-full rounded p-2"
                />
            </div>

            <div className="pl-6 pb-8">
                <span className="font-semibold text-gray-600">Welcome</span>
                <Link
                    className="block text-gray-600 hover:text-gray-800 hover:pl-2 transition-fast"
                    to="/"
                >
                    Introduction
                </Link>
            </div>

            <ul className="list-reset">
                <li className="pl-6 font-semibold text-gray-600">Reference</li>
                {resources.map(resource => (
                    <li key={resource.name} className="py-1 pl-6">
                        <Link to={resource.url} className="text-gray-600 hover:text-gray-800 hover:pl-2 transition-fast">
                            {stripSlashFromName(resource.name)}
                        </Link>
                    </li>
                ))}

            </ul>
        </React.Fragment>
    );

}

export default Navigation;