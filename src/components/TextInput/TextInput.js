

const TextInput = ({ handleInputChange, query }) => {
    return (
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            aria-label="Search"
        />
    );
};


export default TextInput;