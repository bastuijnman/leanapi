import React, { useState } from 'react';
import Dropdown from '../dropdown';
import Schema from '../schema';

function getBodySelectorOptions(values) {
    return values.map((value, index) => ({
        value: index,
        label: value.name
    }));
}

const themes = {
    light: {
        header: 'text-gray-900 border-gray-300',
        content: 'bg-gray-300 text-gray-900'
    },
    dark: {
        header: 'text-white border-gray-900',
        content: 'bg-gray-900 text-white'
    }
};

export default function Bodies({ bodies, theme='light', title='Body' }) {

    const [ activeBodyIndex, setActiveBodyIndex ] = useState(0);
    const onBodySelectorChange = (evnt) => {
        setActiveBodyIndex(evnt.target.value);
    };

    return (
        <>
            <p className={`mb-2 mt-4 font-medium border-l-4 pl-2 flex flex-row items-center ${themes[theme].header}`}>
                <span className="flex-grow">{title}</span>
                {bodies.length > 1 &&
                <Dropdown dark options={getBodySelectorOptions(bodies)} onChange={onBodySelectorChange} />
                }
            </p>

            <div className={`p-3 rounded font-mono text-xs ${themes[theme].content}`}>
                {bodies[activeBodyIndex].example}
                <Schema schema={bodies[activeBodyIndex].schema} />
            </div>
        </>
    );

}