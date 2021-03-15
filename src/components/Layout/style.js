import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import {FaTimes} from "react-icons/fa"

export const Nav = styled.nav`
  background: white;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 10px -5px #777;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    position: fixed;
    bottom: 0;
    width: 100%;
    top: auto;
    box-shadow: 1px 0 10px -5px #777;
    border-radius: 5px;
  }
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavLogo = styled(NavLink)`
  color: black;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  @media screen and (max-width: 768px){
      display:none
  }
`;

export const MobileIcon = styled(NavLink)`
  display: none;
  @media screen and (max-width: 768px) {
    ${"" /* Cuando sea mobile */}
    display:block;
    position: relative;
    top: 30%;
    font-size:2rem;
    cursor: pointer;
    color: black;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;


export const NavBtnLink = styled(Link)`
  text-transform: uppercase;
  white-space: nowrap;
  padding: 10px 22px;
  color: black;
  font-weight: 900;
  outline: none;
  border: none;
  cursor: pointer;
  ${"" /* transition: all 0.2s ease-in-out; */}
  text-decoration: none;

  ${
    "" /* &.hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  } */
  }
`;

export const SideBarContainer = styled.aside`
position:fixed;
z-index:999;
width:100%;
height:100%;
background:#0d0d0d;
display:grid;
align-items:center;
left:0;
transition: 0.4s ease-in-out;
opacity:${props => props.isOpen ? "100%" : "0"};
top:${props => props.isOpen ? "0": "-100%"};
`

export const CloseIcon = styled(FaTimes)`
color:white
`

export const Icon = styled.div`
position: absolute;
top:1.2rem;
right:1.5rem;
background:transparent;
font-size: 2rem;
cursor:pointer;
outline:none;
`
export const SideBarWrapper = styled.div`
color: #fff;
`
export const SideBarMenu = styled.div`
display: grid;
grid-template-columns:1fr;
grid-template-rows: repeat(6,80px);
text-align:center;

@media screen and (max-width:768px){
    grid-template-rows: repeat(6,80px);
}
`
