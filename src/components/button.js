import React from'react';
import PropTypes from 'prop-types';

const styles = {
    primary: 'bg-gray-700 text-white hover:bg-gray-900'
}

function Button ({ children, variant, className, ...props}) {

    const combinedClassName = `px-4 py-2 cursor-pointer rounded focus:outline-none ${styles[variant]} ${className}`;

    return (
        <button
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'tertiary'
    ]).isRequired
}

export default Button;