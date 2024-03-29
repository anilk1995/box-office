const BASE_URL = 'https://api.tvmaze.com';

async function apiGet(queryString) {
  const response = await fetch(`${BASE_URL}/${queryString}`);
  const data = await response.json();

  return data;
}

export const searchForShows = searchString =>
  apiGet(`/search/shows?q=${searchString}`);

export const searchForPeople = searchString =>
  apiGet(`/search/people?q=${searchString}`);

export const getShowById = showId =>
  apiGet(`shows/${showId}?embed[]=seasons&embed[]=cast`);

export const getShowsByIds = async showIds => {
  const promises = showIds.map(showId => getShowById(showId));
  const result = await Promise.all(promises);
  return result;
};
