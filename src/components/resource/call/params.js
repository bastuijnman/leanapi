'use strict';

// Base libraries
import React from 'react';
import CSSX from 'react-cssx';

module.exports = React.createClass({

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
    },

    render () {

        let params = this.props.params;

        if (!params || params.length === 0) {
            return null;
        }

        let rendered = params.map((param) => {

            let tags = this.getParamTags(param).map((tag) => {
                return <span>{tag}</span>;
            });

            return (
                <div>
                    <dt>{param.name} {tags}</dt>
                    { param.description ? <dd>{param.description}</dd> : null }
                    { param.example ? <dd className="example"><strong>Example:</strong> {param.example}</dd> : null }
                </div>
            );

        });

        return (
            <CSSX styles={this.css()}>
                <h3>{this.props.title}</h3>
                <dl>
                    {rendered}
                </dl>
            </CSSX>
        );
    },

    css () {
        return (
            <style>
            dl dt { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0, 0.1); }
            dl dt span { color: rgba(0, 0, 0, 0.5); font-style: italic; display: inline-block; margin: 0 10px; }
            dl dd { margin-bottom: 15px; }
            dl dd.example { color: rgba(0, 0, 0, 0.5); font-style: italic;}
            </style>
        );
    }

});