'use strict';

// Base Libraries
import React from 'react';

// Internal Components
import Syntax from './../../Syntax';

module.exports = React.createClass({

    render () {
        let bodies = this.props.bodies

        if (!bodies || bodies.length === 0) {
            return null;
        }

        return (
            <div>
                <h4>
                    Body
                    <select className="body-select">
                    {bodies.map((body) => {
                        return (<option key={body.name}>{body.name}</option>);
                    })}
                    </select>
                </h4>
                {bodies.map((body) => {
                    return (
                        <div>
                            <p>{body.description}</p>
                            <Syntax code={body.example} />
                        </div>
                    );
                })}
            </div>
        );
    }

});