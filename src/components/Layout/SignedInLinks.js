import React from "react";
import {NavLink} from "react-router-dom"
import { useAuth } from "../../context/AuthContext.utils";
const SignedInLinks = () => {
    const { handleLogout } = useAuth()
    return ( 
        <ul>
            {/* <li><NavLink to="/vender-mi-coche-clasico">Nuevo Anuncio</NavLink></li> */}
            <li><NavLink to="/" onClick={handleLogout}>Log Out</NavLink></li>
            <li><NavLink to="/">Tomy</NavLink></li>
            {/* <li><NavLink to="/">Tus Busquedas</NavLink></li>
            <li><NavLink to="/">Mis Anuncios</NavLink></li>
            <li><NavLink to="/">Mensajes</NavLink></li> */}
        </ul>
     );
}
 
export default SignedInLinks;