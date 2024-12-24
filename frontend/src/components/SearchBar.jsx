import PropTypes from 'prop-types';

function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Введите запрос для поиска..."
        className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
      />
    </div>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SearchBar;
