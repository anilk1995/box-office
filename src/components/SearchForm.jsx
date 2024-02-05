import { useState } from 'react';
import { useSearchstr } from '../lib/useSearchstr';

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useSearchstr();
  const [searchOption, setSearchOption] = useState('shows');
  const onSubmit = e => {
    e.preventDefault();

    const options = {
      q: searchQuery,
      searchOption,
    };

    onSearch(options);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <label>
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={e => setSearchOption(e.target.value)}
          />
          Shows
        </label>
        <label>
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={e => setSearchOption(e.target.value)}
          />
          Actors
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
