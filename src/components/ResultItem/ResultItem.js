import React, { forwardRef } from 'react';

const ResultItem = forwardRef(({
    item,
    highlighted,
    query,
    handleMouseEnter,
    handleMouseLeave,
    className
}, ref) => {
    const highlightText = (value, query) => {
        if (typeof value !== 'string') {
            const itemsHas = query && value.toString().toLowerCase().includes(query.toLowerCase());
            if (itemsHas) {
                return <><span className='highlight-text'>{query}</span>  found in items</>
            }
            return;
        }

        if (!query) return value;

        const parts = value.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? <span key={index} className='highlight-text'>{part}</span> : part
        );
    };

    return (<li
        ref={ref}
        className={highlighted ? `${className} highlight-item` : className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        {Object.values(item).map((value, idx) => (
            <div key={idx}>
                {highlightText(value, query)}
            </div>
        ))}
    </li >
    );
});

export default ResultItem;
