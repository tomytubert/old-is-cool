import React from "react";

import { NavMenu,NavBtnLink } from "./style";
import { useAuth } from "../../context/AuthContext.utils";
const SignedInLinks = () => {
    const { handleLogout } = useAuth()

    return ( 
        <NavMenu>
            <NavBtnLink to="/vender-mi-coche-clasico">Nuevo Anuncio</NavBtnLink>
            <NavBtnLink to="/" onClick={handleLogout}>Log Out</NavBtnLink>
            <NavBtnLink to="/:userId">Mi Cuenta</NavBtnLink>
            <NavBtnLink to="/coches-clasicos">Encuentra tu coche</NavBtnLink>
        </NavMenu>
     );
}
 
export default SignedInLinks;