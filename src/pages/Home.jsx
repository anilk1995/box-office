import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/starred">Go to starred page</Link>
    </div>
  );
}

export default Home;
