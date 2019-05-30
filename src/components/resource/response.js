import React from 'react';

function Response ({ response, ...props }) {

    const { headers, examples } = response;

    return (
        <>
            {headers.length > 0 &&
            <>
                <div className="text-white border-l-4 border-gray-900 pl-2 mb-2">HEADERS</div>
                <div className="bg-gray-900 rounded p-4 text-white overflow-x-scroll text-xs">
                    <pre>
                        {headers.map(header => <p>${header.name}: ${header.example}</p>)}
                    </pre>
                </div>
            </>
            }

            {examples.length > 0 &&
            <>
                <div className="text-white border-l-4 border-gray-900 pl-2 mb-2">BODY</div>
                <div className="bg-gray-900 rounded p-4 text-white overflow-x-scroll text-xs">
                    <pre>
                        {examples.map(example => example.body)}
                    </pre>
                </div>
            </>
            }
        </>
    )

}

export default Response;