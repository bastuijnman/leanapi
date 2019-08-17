import React from 'react';
import Bodies from './bodies';

function Response ({ response, ...props }) {

    if (!response) {
        return <div className="text-white font-mono border-l-4 pl-2 border-transparent">No responses available</div>;
    }

    const { headers, body } = response;

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

            {body.length > 0 &&
                <Bodies bodies={body} theme="dark" />
            }
        </>
    )

}

export default Response;