import React, { useContext } from 'react';
import ApiContext from '../../context/api';

function Introduction () {

    const api = useContext(ApiContext);

    return (
        <div className="flex-grow min-h-screen h-full bg-gray-100">
            <div className="p-4">
                <h1 className="text-3xl">{api.title}</h1>
                <p>{api.description}</p>
            </div>
        </div>
    );

}

export default Introduction;