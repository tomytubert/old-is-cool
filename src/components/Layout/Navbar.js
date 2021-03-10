import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { useAuth } from "../../context/AuthContext.utils";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/">Old Is Cool</Link>
        {user.isLogged ? <SignedInLinks /> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
