import React, { useContext } from 'react';
import ApiContext from '../../context/api';
import NotFound from '../not-found';
import Call from './call';
import ParameterBag from './parameterBag';
import { normalizeResourcePath } from '../navigation';

function findResource (path, resources = []) {
    for (let resource of resources) {
        if (normalizeResourcePath(resource.url) === path) {
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

    const { name, description, calls, parameters } = resource;

    return (
        <React.Fragment>
            <div className="flex flex-col flex-grow min-h-screen h-full bg-gray-100">

                <div className={`flex flex-row ${!calls.length && 'flex-grow'}`}>
                    <div className="w-7/12 flex-grow">
                        <div className="p-4 text-gray-800">
                            <h1 className="text-5xl">{name}</h1>
                            <p>{description}</p>

                            {parameters.length > 0 &&
                                <ParameterBag title="Path parameters" parameters={parameters} />
                            }
                        </div>
                    </div>
                    <div className="w-5/12 flex-grow bg-gray-800">
                        <div className="p-4 text-gray-300">
                            <h2 className="text-5xl">Responses</h2>
                            <p>All responses for {name}.</p>
                        </div>
                    </div>
                </div>

                {calls.map((call, index, arr) => (
                    <Call
                        key={`${call.method}-${name}`}
                        call={call}
                        className={`${index === arr.length - 1 && 'flex-grow' } ${call.method}-${call.name}`}
                    />
                ))}

            </div>
        </React.Fragment>
    )
}

export default Resource;