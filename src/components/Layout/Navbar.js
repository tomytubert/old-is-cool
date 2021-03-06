import React from "react";
import PropTypes from "prop-types"
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Nav, NavBarContainer, NavLogo, MobileIcon,MobileIcon1 } from "./style";
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
        <MobileIcon to="">
          <RiHome2Line />
        </MobileIcon>
        <MobileIcon to="/vender-mi-coche-clasico">
          <AiOutlinePlusCircle />
        </MobileIcon>
        <MobileIcon to={`/profile/${user.id}`}>
          <FiUser />
        </MobileIcon>
        <MobileIcon1 onClick={handleToggle}>
          <FaBars />
        </MobileIcon1>
        {user.isLogged ? <SignedInLinks userId={user.id}/> : <SignedOutLinks />}
      </NavBarContainer>
    </Nav>
  );
};

Navbar.defaultProps = {
  handleToggle: () => {
    return false
  }
}
Navbar.propTypes = {
  handleToggle: PropTypes.func
}

export default Navbar;
