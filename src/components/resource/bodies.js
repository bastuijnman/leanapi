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
    const [ activeTabIndex, setActiveTabIndex ] = useState(0);
    const onBodySelectorChange = (evnt) => {
        setActiveBodyIndex(evnt.target.value);
    };

    // Only show tabs when we have both an example and schema
    const hasTab = bodies[activeBodyIndex].example.length > 0 && bodies[activeBodyIndex].schema.length > 0;
    
    const tabs = [];
    if (bodies[activeBodyIndex].example.length > 0) {
        tabs.push(<pre key="example">{bodies[activeBodyIndex].example}</pre>);
    }

    if (bodies[activeBodyIndex].schema.length > 0) {
        tabs.push(<Schema schema={bodies[activeBodyIndex].schema} />);
    }

    return (
        <>
            <p className={`mb-2 mt-4 font-medium border-l-4 pl-2 flex flex-row items-center ${themes[theme].header}`}>
                <span className="flex-grow">{title}</span>
                {bodies.length > 1 &&
                <Dropdown dark options={getBodySelectorOptions(bodies)} onChange={onBodySelectorChange} />
                }
            </p>

            <div className={`p-3 rounded font-mono text-xs ${themes[theme].content}`}>
                {hasTab &&
                <div className="w-full mb-4">
                    <a onClick={() => setActiveTabIndex(0)} href="#" className={`inline-block w-1/2 p-4 text-center ${activeTabIndex === 0 ? 'bg-gray-800': ''}`}>Example</a>
                    <a onClick={() => setActiveTabIndex(1)} href="#" className={`inline-block w-1/2 p-4 text-center ${activeTabIndex === 1 ? 'bg-gray-800': ''}`}>Schema</a>
                </div>
                }

                {tabs[activeTabIndex]}
            </div>
        </>
    );

}