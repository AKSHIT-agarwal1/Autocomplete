import React, { useEffect, useRef } from 'react';

import ResultItem from '../ResultItem';

const SearchResults = ({ data, query, highlightedIndex, setHighlightedIndex, usingKeyboard, setUsingKeyboard, onKeyDown
}) => {
    const resultsRef = useRef([]);

    useEffect(() => {
        if (highlightedIndex >= 0 && resultsRef.current[highlightedIndex]) {
            resultsRef.current[highlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [highlightedIndex]);


    if (data.length === 0) {
        return <div>No results found</div>;
    }

    return (
        <ul
            onKeyDown={onKeyDown}
            tabIndex={0}
        >
            {data.map((item, index) => (
                <ResultItem
                    key={item?.id}
                    ref={el => resultsRef.current[index] = el}
                    highlighted={highlightedIndex === index}
                    handleMouseEnter={() => {
                        setUsingKeyboard(false);
                        setHighlightedIndex(index);
                    }}
                    handleMouseLeave={() => {
                        if (!usingKeyboard) {
                            setHighlightedIndex(-1);
                        }
                    }}
                    className={usingKeyboard ? 'hide-cursor' : ''}
                    item={item}
                    query={query}
                />
            ))}
        </ul>
    );
};

export default SearchResults;
