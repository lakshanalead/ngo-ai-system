import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div className="bg-slate-900 text-white p-4 flex gap-6 shadow-lg">

      <Link to="/">
        Dashboard
      </Link>

      <Link to="/report">
        Report
      </Link>

      <Link to="/live">
        Live
      </Link>

      <Link to="/smart">
        Smart Match
      </Link>

      <Link to="/maps">
        Maps
      </Link>

      <Link to="/chatbot">
        Chatbot
      </Link>

    </div>

  );
}

export default Navbar;