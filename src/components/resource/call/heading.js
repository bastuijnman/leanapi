import React from 'react';

const colorMap = {

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

function CallInfo ({info}) {
    if (!info) {
        return null;
    }

    if (info.length < 50) return <span className="text-xs self-center">{info}</span>;

    return <span className="self-center font-medium cursor-pointer">&#9432;</span>;
}

function CallHeading ({ call, withoutDescription, className = '' }) {
    const { method, name, description } = call;
    const color = colorMap[method.toLowerCase()] || 'purple';

    if (withoutDescription) {
        return <div className={`p-2 rounded-l bg-${color}-300 text-${color}-800 ${className}`}>{method}</div>;
    }

    return (
        <div className="flex flex-column">
            <div className={`p-2 rounded-l bg-${color}-300 text-${color}-800 font-medium`}>{method}</div>
            <div className={`p-2 rounded-r bg-${color}-200 text-${color}-800 flex-grow flex flex-row`}>
                <span className="flex-grow">{name}</span>
                <CallInfo info={description} />
            </div>
        </div>
    );
}

export { colorMap };
export default CallHeading;