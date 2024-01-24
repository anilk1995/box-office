import { useState } from "react";
import { searchForShows } from "../api/tvmaze";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  async function onSearch(e) {
    e.preventDefault();

    try {
      setApiDataError(null);

      const result = await searchForShows(searchQuery);
      setApiData(result);
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
      return apiData.map((data) => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;
