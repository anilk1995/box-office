import { useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query';

function Show() {
  const { showId } = useParams();
  // const { showData, showError } = useShowById(showId);

  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
  });

  if (showError) {
    return <div>We have an error: {showError}</div>;
  }

  if (showData) {
    return <div>Got Show Data: {showData.name}</div>;
  }

  return <div>Data is loading</div>;
}

export default Show;
