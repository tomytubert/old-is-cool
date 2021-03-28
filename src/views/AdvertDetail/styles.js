
import styled from "styled-components";
import { GiTakeMyMoney } from "react-icons/gi";
import {FaTimes} from "react-icons/fa"
// import { NavLink, Link } from "react-router-dom";

export const Holster = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  @media (min-width: 768px){
    flex-flow: row nowrap;
    width:100%
}
`;

export const Carousel = styled.div`
  display: flex;
  overflow: auto;
  flex: none;
  height: 50vh;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  div {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
    width: 30vw;
  }
  @media screen and (max-width: 768px) {
    div {
      width: 100vw;
    }
  }
  @media (min-width:768px){
    height: 60vh;
    width: 60vw;
    div{
      width:auto
    }
  }
`;
export const CarouselHomePage = styled.div`
  display: flex;
  overflow: auto;
  flex: none;
  margin:20px 0;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  div {
    text-align: start;
    scroll-snap-align: center;
    flex: none;
    width: 30vw;
  }
  @media screen and (max-width: 768px) {
    div {
      width: 90vw;
    }
  }
  @media (min-width:768px){
    width: 100%;
  }
`;

export const SoldOutIcon = styled(GiTakeMyMoney)`

`

export const AdvertWrapPhoto = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
  @media (min-width:768px){
    height: 60vh;
    width: 60vw;
  }
`;
export const AdvertWrapPhotoModal = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
  margin-top:60%;
`;

export const AdvertPhoto = styled.img`
  width: 100vw;
  height: 50vh;
  object-fit: cover;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;
  @media (min-width:768px){
    height: 60vh;
    width: 60vw;
  }

`;
export const AdvertPhotoModal = styled.img`
  width: 100vw;
  height: auto;
  object-fit: cover;
`;
export const AdvertPhotoHomePage = styled.img`
    width: 80vw;
    height: 280px;
    object-fit: cover;
    border-radius: 5%;
    box-shadow: 0 0 10px -5px #777;
    margin-top: 5px;
    margin-left: 20px;
    @media (min-width: 768px){
    width:300px;
    margin:20px 40px;
}
`
export const PhotoInput = styled.div`
  border: 0.5px solid lightgrey;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin: 10px;
`


export const ChatBtn = styled.div`
    background: white;
    color: black;
    box-shadow: 1px 6px 12px -5px #777;
    cursor: pointer;
    font-size: 1.5em;
    margin: auto 25px;
    padding: 20px 50px;
    border: 0;
    /* -webkit-transition: all 0.5s;
    -webkit-transition: all 0.5s; */
    transition: all 0.5s;
    border-radius: 40px;
    /* width: 60%; */
    position: sticky;
    z-index: 10;
    top: auto;
    text-align: center;
    bottom: 15px;
  &:hover {
    background: white;
    transition: all 0.5s;
    box-shadow: 1px 0 15px -5px #777;

    &::after {
      opacity: 1;
      transition: all 0.5s;
    }
  }
  @media screen and (min-width: 768px) {
    width:400px;
    left:32%
  }
`;
export const CarouselData = styled.div`
  display: flex;
  overflow: auto;
  flex: none;
  height: auto;
  flex-flow: row nowrap;
  scroll-snap-type: x;
  section {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
    width: 30vw;
  }
  @media screen and (max-width: 768px) {
    section {
      width: 100vw;
    }
  }
  @media screen and (min-width: 768px) {
    section {
      width: auto;
    }
  }
`;
export const HolsterData = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  box-shadow: 1px 10px 20px -20px #777;
  margin: 15px 0;

`;

export const DataIcon = styled.div`
  margin: 10px 20px;
`;

export const ModalWrapper = styled.section`
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.85);
  position: fixed;
  z-index: 100;
  top: 0;
  animation: fadeIn ease-in-out 0.5s;
  @keyframes fadeIn{
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
`;

export const CloseIcon = styled(FaTimes)`
color:white;
position:relative;
top:1%;
left:85%;
`

export const OptionsBar = styled.nav`
  background: white;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: absolute;
  top: 0;
  width:100vw;
  z-index: 10;
  box-shadow: 0 1px 10px -5px #777;
`;

export const SoldOutModal = styled.aside`
position:fixed;
z-index:999;
width:100%;
height:100%;
background:rgba(255,255,255,0.97);
align-items:center;
left:0;
transition: 0.4s ease-in-out;
opacity:${props => props.isOpen ? "100%" : "0"};
top:${props => props.isOpen ? "0": "-100%"};
`
export const AcceptsSoldOut = styled.button`
    background: #08a045;
    color: white;
    box-shadow: 0px 2px 12px -5px #777;
    cursor: pointer;
    font-size: 17px;
    padding: 10px 20px;
    border: 0;
    transition: all 0.5s;
    border-radius: 40px;
    width: 300px;
    text-transform: uppercase;
`
export const DeclineSoldOut = styled.button`
    background: white;
    color: red;
    border: 1px solid red;
    cursor: pointer;
    font-size: 17px;
    padding: 10px 20px;
    transition: all 0.5s;
    border-radius: 40px;
    width: 300px;
    text-transform: uppercase;
`