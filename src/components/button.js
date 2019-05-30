import React from'react';
import PropTypes from 'prop-types';

const styles = {
    primary: {
        base: 'bg-gray-700 text-white hover:bg-gray-900',
        active: 'bg-gray-900'
    }
}

function Button ({ children, variant, active, className, ...props}) {

    const classNames = ['px-4 py-2 cursor-pointer rounded focus:outline-none transition-fast'];

    // Attach variant & conditional classes
    classNames.push(styles[variant].base);
    if (active) {
        classNames.push(styles[variant].active);
    }

    // Attach classNames passed as prop
    classNames.push(className);

    return (
        <button
            className={classNames.join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'tertiary'
    ]).isRequired,
    active: PropTypes.bool
}

export default Button;