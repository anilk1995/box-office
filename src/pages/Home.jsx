import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  async function onSearch(e) {
    e.preventDefault();

    try {
      setApiDataError(null);

      if (searchOption === 'shows') {
        const result = await searchForShows(searchQuery);
        setApiData(result);
      }
      if (searchOption === 'actors') {
        const result = await searchForPeople(searchQuery);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
    }
  }

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occured: {apiDataError.message}</div>;
    }

    if (!apiData) return null;

    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
    }
  };
  console.log(searchOption);
  return (
    <div>
      <form onSubmit={onSearch}>
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

      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
