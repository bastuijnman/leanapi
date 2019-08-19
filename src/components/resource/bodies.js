import React, { useState } from 'react';
import Dropdown from '../dropdown';
import Schema from '../schema';

function getBodySelectorOptions(values) {
    return values.map((value, index) => ({
        value: index,
        label: value.name,
        description: value.description
    }));
}

const themes = {
    light: {
        header: 'text-gray-900 border-gray-300',
        description: 'text-gray-900',
        content: 'bg-gray-300 text-gray-900',
        tabs: 'bg-gray-400'
    },
    dark: {
        header: 'text-white border-gray-900',
        description: 'text-white',
        content: 'bg-gray-900 text-white',
        tabs: 'bg-gray-800'
    }
};

export default function Bodies({ bodies, theme='light', title='Body' }) {

    const [ activeBodyIndex, setActiveBodyIndex ] = useState(0);
    const [ activeTabIndex, setActiveTabIndex ] = useState(0);
    const onBodySelectorChange = (value) => {
        setActiveBodyIndex(value);
    };

    // Only show tabs when we have both an example and schema
    const hasTab = bodies[activeBodyIndex].example.length > 0 && bodies[activeBodyIndex].schema.length > 0;
    
    const tabs = [];
    if (bodies[activeBodyIndex].example.length > 0) {
        tabs.push(<pre key="example" className="overflow-scroll">{bodies[activeBodyIndex].example}</pre>);
    }

    if (bodies[activeBodyIndex].schema.length > 0) {
        tabs.push(<Schema key="schema" schema={bodies[activeBodyIndex].schema} />);
    }

    const activeTheme = themes[theme];

    return (
        <>
            <p className={`mb-2 mt-4 font-medium border-l-4 pl-2 flex flex-row items-center ${activeTheme.header}`}>
                <span className="flex-grow">{title}</span>
                {bodies.length > 1 &&
                <Dropdown theme={theme} defaultValue={0} options={getBodySelectorOptions(bodies)} onChange={onBodySelectorChange} />
                }
            </p>
            
            {bodies[activeBodyIndex].description && 
            <p className={`${activeTheme.description} text-xs pl-2 font-thin border-l-4 border-transparent mb-2`}>
                {bodies[activeBodyIndex].description}
            </p>
            }
            <div className={`p-3 rounded font-mono text-xs ${activeTheme.content}`}>
                {hasTab &&
                <div className="w-full mb-4">
                    <a onClick={() => setActiveTabIndex(0)} className={`inline-block w-1/2 p-4 text-center cursor-pointer ${activeTabIndex === 0 ? activeTheme.tabs : ''}`}>Example</a>
                    <a onClick={() => setActiveTabIndex(1)} className={`inline-block w-1/2 p-4 text-center cursor-pointer ${activeTabIndex === 1 ? activeTheme.tabs : ''}`}>Schema</a>
                </div>
                }

                {tabs[activeTabIndex]}
            </div>
        </>
    );

}