import { useParams } from 'react-router-dom';

function Show() {
  const { showId } = useParams();

  return <div>show page for show {showId}</div>;
}

export default Show;
