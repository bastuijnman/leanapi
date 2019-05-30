import React, { useState } from 'react';

import Button from '../button';

const map = {

    // Method color maps
    get: 'green',
    post: 'blue',
    put: 'orange',
    patch: 'teal',
    delete: 'red',

    // Status color maps
    2: 'green',
    3: 'yellow',
    4: 'orange',
    5: 'red',
};

function Call ({ call, className }) {

    const color = map[call.method.toLowerCase()] || 'purple';
    const { responses, description, headers } = call;

    const [ activeResponse, setActiveResponse ] = useState(responses[0]);

    return (
        <div className={`flex flex-row ${className}`}>
            <div className="w-7/12 flex-grow">
                <div className="p-4">

                    <div className="flex flex-column">
                        <div className={`p-2 rounded-l bg-${color}-300 text-white font-medium`}>{call.method}</div>
                        <div className={`p-2 rounded-r bg-${color}-200 text-gray-800 flex-grow`}>{call.name}</div>
                    </div>

                    <p>{description}</p>

                    <p className="mt-4 mb-2 font-bold text-gray-900">Headers</p>
                    {headers.map(header => (
                        <div key={header.name} className="mb-8 text-gray-700">
                            <pre className="text-xs bg-gray-200 border border-gray-300 inline-block p-1 px-2">{header.name}</pre>
                            <pre className="text-xs ml-2 inline-block">{header.type.join(', ')}</pre>
                            {header.required && <span className="float-right text-gray-600">REQUIRED</span>}

                            <p className="text-sm">{header.description}</p>
                            <p className="text-sm break-all"><strong>Example:</strong> <span className="font-mono">{header.example}</span></p>
                        </div>
                    ))}

                </div>
            </div>
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
                                <span className={`mr-2 text-${map[response.code[0]]}-500`}>&#x25C9;</span>
                                {response.code}
                            </Button>
                        ))}
                    </div>

                    {/* Render active response */}
                    <div className="bg-gray-900 rounded p-4 text-white overflow-x-scroll text-xs">
                        <pre>
                            {activeResponse.examples.map(example => example.body)}
                        </pre>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default Call;