import React, { useContext } from 'react';
import ApiContext from '../../context/api';
import NotFound from '../not-found';

function findResource (path, resources = []) {

    for (let resource of resources) {
        if (resource.url === path) {
            return resource;
        }

        if (resource.children > 0) {
            let found = findResource(path, resource.children);

            if (found) {
                return found;
            }
        }
    }

    return null
}

function Resource ({ match }) {
    const api = useContext(ApiContext);
    const resource = findResource(match.url, api.resources);

    if (!resource) {
        return <NotFound />;
    }

    return (
        <React.Fragment>
            <div className="w-6/12 min-h-screen bg-gray-100">
                <div className="p-4">
                    <h1 className="text-5xl">{resource.name}</h1>
                </div>
            </div>
            <div className="w-3/12 min-h-screen bg-gray-800">RESPONSES</div>
        </React.Fragment>
    )
}

export default Resource;