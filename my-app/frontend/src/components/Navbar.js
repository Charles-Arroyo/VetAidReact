import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [loginButtonState, setLoginButtonState] = useState("Login");
  useEffect(() => {
    if (user) {
      setLoginButtonState(location.pathname === "/login" ? "Home" : "Account");
    } else {
      setLoginButtonState("Login");
    }
  }, [location.pathname, user]);

  const getButtonText = (path, defaultText) => {
    return location.pathname === path ? "Home" : defaultText;
  };

  return (
    <nav>
      <h3 className="nav--logo_text">Vet Link</h3>
      <Link to={location.pathname === "/about" ? "/" : "/about"}>
        <button
          id="button"
          className="nav-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {location.pathname === "/about" ? "Home" : "About"}
        </button>
      </Link>
      
      <Link to={location.pathname === "/calendar" ? "/" : "/calendar"}>
        <button
          id="button"
          className="nav-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {getButtonText("/calendar", "Calendar")}
        </button>
      </Link>

     

      <Link to={location.pathname === "/meeting" ? "/" : "/meeting"}>
        <button
          id="button"
          className="nav-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {getButtonText("/meeting", "Meeting")}
        </button>
      </Link>

      <Link to={location.pathname === "/meetings" ? "/" : "/meetings"}>
        <button
          id="button"
          className="nav-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {getButtonText("/meetings", "Schedule")}
        </button>
      </Link>




      {!user ? (
        <>
          <Link to={location.pathname === "/signup" ? "/" : "/signup"}>
            <button
              id="button"
              className="nav-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              {getButtonText("/signup", "Signup")}
            </button>
          </Link>
        </>
      ) : null}

      <Link to={location.pathname === "/login" ? "/" : "/login"}>
        <button
          id="button"
          className="nav-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {location.pathname === "/login" ? "Home" : loginButtonState}
        </button>
      </Link>

     
    </nav>
  );
}
