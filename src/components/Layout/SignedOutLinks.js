import React from "react";
import { NavMenu, NavBtnLink } from "./style";

const SignedOutLinks = () => {
  return (
    <NavMenu className="right">
      <NavBtnLink to="/vender-mi-coche-clasico">Nuevo Anuncio</NavBtnLink>
      <NavBtnLink to="/:userId">Mi Cuenta</NavBtnLink>
      <NavBtnLink to="/coches-clasicos">Encuentra tu coche</NavBtnLink>
      <NavBtnLink to="/signup">Signup</NavBtnLink>
      <NavBtnLink to="/login">Login</NavBtnLink>
    </NavMenu>
  );
};

export default SignedOutLinks;
