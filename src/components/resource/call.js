import React from 'react';

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

    return (
        <div className={`flex flex-row ${className}`}>
            <div className="w-7/12 flex-grow">
                <div className="p-4">

                    <div className="flex flex-column">
                        <div className={`p-2 rounded-l bg-${color}-300 text-white`}>{call.method}</div>
                        <div className={`p-2 rounded-r bg-${color}-200 text-gray-800 flex-grow`}>{call.name}</div>
                    </div>

                    <p>{description}</p>

                    <h3 className="text-3xl">Headers</h3>
                    {headers.map(header => (
                        <div key={header.name} className="mb-8">
                            <pre className="text-xs bg-gray-200 border border-gray-300 inline-block p-1 px-2">{header.name}</pre>
                            <pre className="text-xs ml-2 inline-block">{header.type.join(', ')}</pre>
                            {header.required && <span className="float-right text-gray-600">REQUIRED</span>}

                            <p className="text-sm">{header.description}</p>
                            <p className="text-sm"><strong>Example:</strong> {header.example}</p>
                        </div>
                    ))}

                </div>
            </div>
            <div className="w-5/12 flex-grow bg-gray-800">
                <div className="py-4 px-2">

                    <div className="-ml-2 mb-2">
                        {responses.map(response => (
                            <Button
                                key={response.code}
                                className="ml-2"
                            >
                                <span className={`mr-2 text-${map[response.code[0]]}-500`}>&#x25C9;</span>
                                {response.code}
                            </Button>
                        ))}
                    </div>

                    {responses.map(response => (
                        <div className="bg-gray-900 rounded p-1 text-white overflow-x-scroll text-xs">
                            <pre>
                                {response.examples.map(example => JSON.stringify(JSON.parse(example.body), null, 4))}
                            </pre>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )

}

export default Call;