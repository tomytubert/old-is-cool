import React from "react";
import { NavMenu,NavBtnLink } from "./style";


const SignedOutLinks = () => {
    return ( 
        <NavMenu className="right">
            <NavBtnLink to="/signup">Signup</NavBtnLink>
            <NavBtnLink to="/login">Login</NavBtnLink>
        </NavMenu>
     );
}
 
export default SignedOutLinks;