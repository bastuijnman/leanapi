import React, { useState, useEffect } from 'react';

const themes = {
    light: {
        select: 'bg-white border border-gray-400 hover:border-gray-500',
        arrow: 'text-gray-700'
    },
    dark: {
        select: 'bg-gray-900 border border-gray-700 hover:border-gray-600',
        arrow: 'text-gray-700'
    }
}

const getHoverRoundedClassName = (index, count) => {
    if (index === 0) return 'rounded-t';
    if (index === count - 1) return 'rounded-b';
    return 'rounded-none';
}

const getHoverOrActiveBackground = (optionValue, currentValue) => {
    if (optionValue === currentValue) {
        return 'bg-gray-400';
    }
    return 'hover:bg-gray-100';
}

export default function Dropdown ({ options, defaultValue, onChange, theme='light', className = '' }) {
    const activeTheme = themes[theme];
    const [ isOpened, setIsOpened ] = useState(false);
    const [ value, setValue ] = useState(defaultValue);
    const onItemClick = (value) => {
        return () => {
            setValue(value);
            onChange(value);
            setIsOpened(false);
        }
    };

    /**
     * Handles dropdown opening/closing
     */
    useEffect(() => {
        const listener = evnt => {
            if (element && element.contains(evnt.target)) {
                setIsOpened(true);
                return;
            }
            setIsOpened(false);
        };
        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    });

    let element;
    return (
        <div ref={e => element = e} className={`inline-block relative rounded p-2 ${activeTheme.select} ${className}`}>
            <div className="mr-6">
                {options.find(option => value === option.value).label}
            </div>
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${activeTheme.arrow}`}>
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>

            {isOpened &&
            <div className="absolute w-full bg-white left-0 mt-3 rounded shadow">
                {options.map((option, index) => (
                    <div 
                        key={option.value}
                        onClick={onItemClick(option.value)} 
                        className={`p-2 text-gray-900 ${getHoverOrActiveBackground(option.value, value)} ${getHoverRoundedClassName(index, options.length)}`}
                    >
                        {option.label}
                        {option.description && <div className="font-thin text-xs">{option.description}</div>}
                    </div>
                ))}
            </div>
            }
        </div>
    );

}