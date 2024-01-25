import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';

function Show() {
  const { showId } = useParams();
  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setShowError(null);
        const data = await getShowById(showId);
        setShowData(data);
      } catch (error) {
        setShowError(error.message);
      }
    }
    fetchData();
  }, [showId]);

  return <div>show page for show {showId}</div>;
}

export default Show;
