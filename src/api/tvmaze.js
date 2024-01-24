const BASE_URL = "https://api.tvmaze.com";

async function apiGet(queryString) {
  const response = await fetch(`${BASE_URL}/${queryString}`);
  const data = await response.json();

  return data;
}

export const searchForShows = (searchString) =>
  apiGet(`/search/shows?q=${searchString}`);
