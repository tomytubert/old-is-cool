import React from "react";
import PropTypes from "prop-types"
import { NavMenu, NavBtnLink } from "./style";
import { useAuth } from "../../context/AuthContext.utils";
const SignedInLinks = ({ userId }) => {
  const { handleLogout } = useAuth();

  return (
    <NavMenu>
      <NavBtnLink to="/coches-clasicos">Encuentra tu coche</NavBtnLink>
      <NavBtnLink to="/vender-mi-coche-clasico">Nuevo Anuncio</NavBtnLink>
      <NavBtnLink to={`/mensajes/${userId}`}>Mensajes</NavBtnLink>
      <NavBtnLink to={`/profile/${userId}`}>Mi Cuenta</NavBtnLink>
      <NavBtnLink to="/" onClick={handleLogout}>
        Log Out
      </NavBtnLink>
    </NavMenu>
  );
};

SignedInLinks.defaultProps = {
  userId: ""
}
SignedInLinks.propTypes = {
  userId: PropTypes.string
}

export default SignedInLinks;
