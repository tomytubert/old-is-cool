import React from "react";
import { useAuth } from "../../context/AuthContext.utils";
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
        <CloseIcon isOpen={isOpen}></CloseIcon>
      </Icon>
      <SideBarWrapper>
        <SideBarMenu>
          {/* <SideBarItemWrapper> */}
            <SideBarItem to="">Encuentra tu coche</SideBarItem>
            <SideBarItem to="">Nuevo anuncio</SideBarItem>
            {user.isLogged ? 
            <>
            <SideBarItem to="">Favoritos</SideBarItem>
            <SideBarItem to="">Tus Busquedas</SideBarItem>
            <SideBarItem to="">Mensajes</SideBarItem>
            <SideBarItem to="">Mis Anuncios</SideBarItem>
            <SideBarItem to="/" onClick={handleLogout}>Log Out</SideBarItem>
            </>
            : <SideBarItem to="/login">Login</SideBarItem>}
          {/* </SideBarItemWrapper> */}
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  );
};

export default SideBar;
