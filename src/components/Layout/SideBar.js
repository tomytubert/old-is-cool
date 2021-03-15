import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { useAuth } from "../../context/AuthContext.utils";
import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SideBarWrapper,
  SideBarMenu,
} from "./style";

const SideBar = ({ isOpen, handleToggle }) => {
  const { user } = useAuth();
  return (
    <SideBarContainer isOpen={isOpen} onClick={handleToggle}>
      <Icon>
        <CloseIcon isOpen={isOpen}></CloseIcon>
      </Icon>
      <SideBarWrapper>
        <SideBarMenu>
          {user.isLogged ? <SignedInLinks /> : <SignedOutLinks />}
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  );
};

export default SideBar;
