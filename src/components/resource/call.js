import React from 'react';

function Call ({ call, className }) {

    return (
        <div className={`flex flex-row ${className}`}>
            <div className="w-2/3 flex-grow">
                <div className="p-4">

                    <div className="flex flex-column">
                        <div className="p-2 rounded-l bg-green-300 text-white">{call.method}</div>
                        <div className="p-2 rounded-r bg-green-200 text-gray-800 flex-grow">{call.name}</div>
                    </div>

                </div>
            </div>
            <div className="w-1/3 flex-grow bg-gray-800">
                <div className="py-4 px-2">
                    Response ding
                </div>
            </div>
        </div>
    )

}

export default Call;