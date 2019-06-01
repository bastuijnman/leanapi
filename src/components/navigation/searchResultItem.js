import React from 'react';
import { withRouter } from 'react-router-dom';

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
            className="block cursor-pointer mb-4 text-sm text-gray-600"
        >
            <div>{item.url}</div>
            {item.calls.map(call => <div className="inline-block text-xs p-1 mr-1 bg-gray-500">{call.method}</div>)}
        </div>
    );
}

export default withRouter(SearchResultItem);