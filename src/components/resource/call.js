import React, { useState } from 'react';

import Button from '../button';
import Response from './response';
import CallHeading, { colorMap } from './call/heading';
import Dropdown from '../dropdown';
import ParameterBag from './parameterBag';
import Schema from '../schema';

function getBodySelectorOptions(values) {
    return values.map((value, index) => ({
        value: index,
        label: value.name
    }));
}

function Call ({ call, className }) {

    const { responses, headers, query, body } = call;
    const [ activeResponse, setActiveResponse ] = useState(responses[0]);
    const [ activeBodyIndex, setActiveBodyIndex ] = useState(0);

    const onBodySelectorChange = (evnt) => {
        setActiveBodyIndex(evnt.target.value);
    };

    return (
        <div className={`flex flex-row ${className}`}>

            {/* Content section */}
            <div className="w-7/12 flex-grow">
                <div className="p-4">

                    <CallHeading call={call} />

                    {headers.length > 0 &&
                        <ParameterBag title="Headers" parameters={headers} />
                    }

                    {query.length > 0 &&
                        <ParameterBag title="Query Parameters" parameters={query} />
                    }

                    {body.length > 0 &&
                    <>
                        <p className="mb-2 mt-4 font-medium text-gray-900 border-l-4 pl-2 border-gray-300 flex flex-row items-center">
                            <span className="flex-grow">Body</span>
                            {body.length > 1 &&
                            <Dropdown options={getBodySelectorOptions(body)} onChange={onBodySelectorChange} />
                            }
                        </p>

                        <div className="p-3 rounded bg-gray-300 text-gray-900 font-mono text-xs">
                            {body[activeBodyIndex].example}
                            <Schema schema={body[activeBodyIndex].schema} />
                        </div>
                    </>
                    }
                </div>
            </div>

            {/* Responses section */}
            <div className="w-5/12 flex-grow bg-gray-800">
                <div className="py-4 px-2">

                    {/* Set of response code lists */}
                    <div className="-ml-2 mb-2">
                        {responses.map(response => (
                            <Button
                                key={response.code}
                                variant="primary"
                                active={activeResponse === response}
                                onClick={() => setActiveResponse(response)}
                                className="ml-2"
                            >
                                <span className={`mr-2 text-${colorMap[response.code[0]]}-500`}>&#x25C9;</span>
                                {response.code}
                            </Button>
                        ))}
                    </div>

                    {/* Render active response */}
                    <Response response={activeResponse} />

                </div>
            </div>
        </div>
    )

}

export default Call;