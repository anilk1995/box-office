import { useStarredShows } from '../lib/useStarredShows';

function Starred() {
  const [starredShows] = useStarredShows();

  return <div>starred page, starred {starredShows.length}</div>;
}

export default Starred;
