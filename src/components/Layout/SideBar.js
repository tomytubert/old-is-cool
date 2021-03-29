import React from "react";
import { useAuth } from "../../context/AuthContext.utils";
import PropTypes from "prop-types"
import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SideBarWrapper,
  SideBarMenu,
  SideBarItem,
} from "./style";

const SideBar = ({ isOpen, handleToggle }) => {
  const { user,handleLogout } = useAuth();
  return (
    <SideBarContainer isOpen={isOpen} onClick={handleToggle}>
      <Icon>
        <CloseIcon />
      </Icon>
      <SideBarWrapper>
        <SideBarMenu>
          {/* <SideBarItemWrapper> */}
            <SideBarItem to="/coches-clasicos">Encuentra tu coche</SideBarItem>
            <SideBarItem to="/vender-mi-coche-clasico">Nuevo anuncio</SideBarItem>
            {user.isLogged ? 
            <>
            {/* <SideBarItem to="">Favoritos</SideBarItem> */}
            {/* <SideBarItem to="">Tus Busquedas</SideBarItem> */}
            <SideBarItem to={`/mensajes/${user.id}`}>Mensajes</SideBarItem>
            <SideBarItem to={`/profile/${user.id}`}>Mis Anuncios</SideBarItem>
            <SideBarItem to="/" onClick={handleLogout}>Log Out</SideBarItem>
            </>
            : <SideBarItem to="/login">Login</SideBarItem>}
          {/* </SideBarItemWrapper> */}
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  );
};
SideBar.defaultProps = {
  handleToggle: () => {
    return false
  },
  isOpen: false
}
SideBar.propTypes = {
  handleToggle: PropTypes.func,
  isOpen: PropTypes.bool
}

export default SideBar;
