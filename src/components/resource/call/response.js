'use strict';

// Base libraries
import React from 'react';

// Components
import Toggle from 'material-ui/Toggle';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

// Update styling to
github.hljs.padding = '15px 30px 15px 60px';
github.hljs.margin = '0 -30px 0 -60px';

module.exports = React.createClass({

    getInitialState() {
        return {
            open: false
        };
    },

    onToggleOpen () {
        this.setState({
            open: !this.state.open
        });
    },

    render () {
        let response = this.props.response;

        let toggleStyle = {
            display: 'inline-block',
            width: 'auto',
            marginRight: '15px'
        };
        console.log(response);
        return (
            <div>
                <h4>
                    <Toggle style={toggleStyle} onToggle={this.onToggleOpen} />
                    {response.code} - {response.description}
                </h4>
                <div style={{display:this.state.open ? 'block' : 'none'}}>
                {response.examples.map((example) => {
                    return (
                        <div>
                            <h5>{example.description}</h5>
                            <SyntaxHighlighter language="javascript" style={github}>{example.body}</SyntaxHighlighter>
                        </div>
                    );
                })}
                </div>
            </div>
        );
    }

});