import React from 'react';

export default function ParameterBag({ title, parameters, className }) {
    return (
        <div className={className}>
            <p className={`mb-2 mt-4 font-medium text-gray-900 border-l-4 pl-2 border-gray-300`}>{title}</p>
            {parameters.map(parameter => (
                <div key={parameter.name} className="mb-8 text-gray-700">
                    <pre className="text-xs bg-gray-200 border border-gray-300 inline-block p-1 px-2">{parameter.name}</pre>
                    <pre className="text-xs ml-2 inline-block">{parameter.type.join(', ')}</pre>
                    {parameter.required && <span className="float-right text-gray-600">REQUIRED</span>}

                    <p className="text-sm">{parameter.description}</p>
                    <p className="text-sm break-all"><strong>Example:</strong> <span className="font-mono">{parameter.example}</span></p>
                </div>
            ))}
        </div>
    );
}