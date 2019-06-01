import React, { useContext } from 'react';
import ApiContext from '../../context/api';
import NotFound from '../not-found';
import Call from './call';

function findResource (path, resources = []) {
    for (let resource of resources) {
        if (resource.url === path) {
            return resource;
        }

        if (resource.children.length > 0) {
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

    const { name, description, calls } = resource;

    return (
        <React.Fragment>
            <div className="flex flex-col flex-grow min-h-screen h-full bg-gray-100">

                <div className={`flex flex-row ${!calls.length && 'flex-grow'}`}>
                    <div className="w-7/12 flex-grow">
                        <div className="p-4 text-gray-800">
                            <h1 className="text-5xl">{name}</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="w-5/12 flex-grow bg-gray-800"></div>
                </div>

                {calls.map((call, index, arr) => (
                    <Call
                        key={`${call.method}-${call.name}`}
                        call={call}
                        className={`${index === arr.length - 1 && 'flex-grow' }`}
                    />
                ))}

            </div>
        </React.Fragment>
    )
}

export default Resource;