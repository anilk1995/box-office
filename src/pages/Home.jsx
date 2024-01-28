import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowsGrid from '../components/shows/ShowsGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
import { useQuery } from '@tanstack/react-query';

function Home() {
  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  async function onSearch({ q, searchOption }) {
    setFilter({ q, searchOption });
  }

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Occured: {apiDataError.message}</div>;
    }

    if (!apiData) return null;

    if (apiData?.length === 0) return <div>No results</div>;

    if (apiData) {
      return apiData[0].show ? (
        <ShowsGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
  };
  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
