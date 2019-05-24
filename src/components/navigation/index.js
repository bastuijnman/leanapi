import React from 'react';
import { Link } from 'react-router-dom';

function stripSlashFromName(name) {
    return name.indexOf('/') === 0 ? name.substring(1) : name;
}

function Navigation ({ api }) {

    const { resources } = api;

    return (
        <React.Fragment>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search API"
                    className="block w-full rounded p-2"
                />
            </div>
            <ul className="list-reset px-4">

                {resources.map(resource => (
                    <li key={resource.name} className="my-2">
                        <Link to={resource.url}>
                            {stripSlashFromName(resource.name)}
                        </Link>
                    </li>
                ))}

            </ul>
        </React.Fragment>
    );

}

export default Navigation;