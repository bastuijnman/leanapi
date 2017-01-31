import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

// Update styling to
github.hljs.padding = '15px 30px 15px 60px';
github.hljs.margin = '0 -30px 0 -60px';

module.exports = React.createClass({

    render () {
        return (<SyntaxHighlighter language="javascript" style={github}>{this.props.code}</SyntaxHighlighter>);
    }

});