import React from 'react';

export default function Schema({ schema }) {

    return (
        <table className="c-schema w-full text-xs table-fixed">
            <thead>
                <tr className="text-left border-b-2 border-gray-400">
                    <th>Property</th>
                    <th>Type</th>
                    <th className="w-1/12"></th>
                </tr>
            </thead>
            <tbody>
                {schema.map(property => (
                    <>
                    <tr>
                        <td>{property.name}</td>
                        <td>{property.type}</td>
                        <td className="text-right">{property.required && '*'}</td>
                    </tr>
                    <tr className="pb-4">
                        <td colSpan="3" className="description">{property.description}</td>
                    </tr>
                    </>
                ))}
            </tbody>
        </table>
    );

};