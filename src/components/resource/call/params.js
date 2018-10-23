'use strict';

// Base libraries
import React from 'react';

const styles = {
    dt: {
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(0,0,0, 0.1)'
    },
    dtSpan: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontStyle: 'italic',
        display: 'inline-block',
        margin: '0 10px'
    },
    dd: {
        marginBottom: '15px'
    },
    ddExample: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontStyle: 'italic'
    }
}

class Params extends React.Component {

    /**
     * Get a list of all supported parameter tags and use
     * either the tag key as a value or the actual tag value.
     *
     * @param {array} param - Array of parameters
     */
    getParamTags (param) {
        let keys = ['type', 'required'];

        let camel = function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        return keys.map((key) => {
            let value = param[key];

            if (typeof value === 'boolean' && value) {
                return camel(key);
            } else if (typeof value === 'string') {
                return camel(value);
            }

            return null;
        }).filter((tag) => {
            return tag !== null;
        });
    }

    render () {

        let params = this.props.params;

        if (!params || params.length === 0) {
            return null;
        }

        let rendered = params.map((param) => {

            let tags = this.getParamTags(param).map((tag) => {
                return <span style={style.dtSpan}>{tag}</span>;
            });

            return (
                <div key={param.name}>
                    <dt style={styles.dt}>{param.name} {tags}</dt>
                    { param.description ? <dd style={styles.dd}>{param.description}</dd> : null }
                    { param.example ? <dd style={style.ddExample}><strong>Example:</strong> {param.example}</dd> : null }
                </div>
            );

        });

        return (
            <div style={{ paddingLeft: '15px' }}>
                <h2>{this.props.title}</h2>
                <dl>
                    {rendered}
                </dl>
            </div>
        );
    }

}

export default Params;