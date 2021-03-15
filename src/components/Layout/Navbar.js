import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Nav, NavBarContainer, NavLogo, MobileIcon } from "./style";
import { FaBars } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.utils";

const Navbar = ({handleToggle}) => {
  const { user } = useAuth();
  return (
    <Nav>
      <NavBarContainer>
        <NavLogo to="/" >Old Is Cool</NavLogo>
        <MobileIcon to="/">
          <RiHome2Line />
        </MobileIcon>
        <MobileIcon to="/vender-mi-coche-clasico">
          <AiOutlinePlusCircle />
        </MobileIcon>
        <MobileIcon to="/userID">
          <FiUser />
        </MobileIcon>
        <MobileIcon to="" onClick={handleToggle}>
          <FaBars />
        </MobileIcon>
        {user.isLogged ? <SignedInLinks /> : <SignedOutLinks />}
      </NavBarContainer>
    </Nav>
  );
};

export default Navbar;
