import React from "react";

import { NavMenu,NavItem,NavBtnLink } from "./style";
import { useAuth } from "../../context/AuthContext.utils";
const SignedInLinks = () => {
    const { handleLogout } = useAuth()
    return ( 
        <NavMenu>
            {/* <li><NavLink to="/vender-mi-coche-clasico">Nuevo Anuncio</NavLink></li> */}
            <NavItem><NavBtnLink to="/" onClick={handleLogout}>Log Out</NavBtnLink></NavItem>
            <NavItem><NavBtnLink to="/">Tomy</NavBtnLink></NavItem>
            {/* <li><NavLink to="/">Tus Busquedas</NavLink></li>
            <li><NavLink to="/">Mis Anuncios</NavLink></li>
            <li><NavLink to="/">Mensajes</NavLink></li> */}
        </NavMenu>
     );
}
 
export default SignedInLinks;