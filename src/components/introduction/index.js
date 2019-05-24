import React, { useContext } from 'react';
import ApiContext from '../../context/api';

function Introduction () {

    const api = useContext(ApiContext);

    return (
        <React.Fragment>
            <h1 className="text-3xl">{api.title}</h1>
            <p>{api.description}</p>
        </React.Fragment>
    );

}

export default Introduction;