import React from 'react';
import { withRouter } from 'react-router-dom';

import CallHeading from '../resource/call/heading';

function SearchResultItem ({ history, item, onNavigate }) {

    if (!item.calls.length) {
        return null;
    }

    const onClick = () => {
        history.push(item.url);

        if (onNavigate) {
            onNavigate();
        }
    }

    return (
        <div
            onClick={onClick}
            className="block cursor-pointer mb-4 text-sm text-gray-600 transition-fast hover:pl-4"
        >
            <div>{item.url}</div>
            {item.calls.map(call => <CallHeading call={call} className="inline-block text-xs mr-1 rounded" withoutDescription />)}
        </div>
    );
}

export default withRouter(SearchResultItem);