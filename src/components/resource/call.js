import React, { useState } from 'react';

import Button from '../button';
import Response from './response';
import CallHeading, { colorMap } from './call/heading';

function Call ({ call, className }) {

    const { responses, headers, body } = call;
    const [ activeResponse, setActiveResponse ] = useState(responses[0]);
    const [ activeBodyIndex, setActiveBodyIndex ] = useState(0);

    return (
        <div className={`flex flex-row ${className}`}>

            {/* Content section */}
            <div className="w-7/12 flex-grow">
                <div className="p-4">

                    <CallHeading call={call} />

                    <p className={`mb-2 mt-4 font-medium text-gray-900 border-l-4 pl-2 border-gray-300`}>Headers</p>
                    {headers.map(header => (
                        <div key={header.name} className="mb-8 text-gray-700">
                            <pre className="text-xs bg-gray-200 border border-gray-300 inline-block p-1 px-2">{header.name}</pre>
                            <pre className="text-xs ml-2 inline-block">{header.type.join(', ')}</pre>
                            {header.required && <span className="float-right text-gray-600">REQUIRED</span>}

                            <p className="text-sm">{header.description}</p>
                            <p className="text-sm break-all"><strong>Example:</strong> <span className="font-mono">{header.example}</span></p>
                        </div>
                    ))}

                    {body.length > 0 &&
                    <>
                        <p className={`mb-2 mt-4 font-medium text-gray-900 border-l-4 pl-2 border-gray-300`}>Body</p>
                        <div className="p-3 rounded bg-gray-300 text-gray-900 font-mono">
                            {body[activeBodyIndex].example}
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