import React from'react';

function Button ({ children, className, ...props}) {

    const combinedClassName = `px-4 py-2 bg-gray-700 text-white cursor-pointer hover:bg-gray-900 rounded ${className}`;

    return (
        <button
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;