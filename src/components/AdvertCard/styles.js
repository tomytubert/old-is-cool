import styled from "styled-components";
// import { NavLink, Link } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

export const Advert = styled.div`
  text-align: center;
  margin: 15px 0;
  flex: 0 1 50%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: center;
  justify-content: center;
`;
export const AdvertWrapPhoto = styled.div`
  /* border-radius:15%; */
  /* box-shadow: 1px 0 10px -5px #777; */
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: center;
`;

export const AdvertInformation = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AdvertTitle = styled.div`
  h3 {
    color: black;
    font-size: 25px;
    font-weight: 700;
  }
  p {
    color: grey;
    margin-right: 203px;
  }
`;
export const AdvertOtherInformation = styled.div`
  color: grey;
  margin-right: 70px;
  text-align: start;
`;

export const AdvertPhoto = styled.img`
  width: 313px;
  height: 270px;
  object-fit: cover;
  border-radius: 10%;
  box-shadow: 1px 0 15px -5px #777;
  svg {
    position: relative;
    top: 10px;
    left: 300px;
  }
`;

export const Holster = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`;

export const Carousel = styled.div`
  display: flex;
  overflow: auto;
  flex: none;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  div {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
    width: 30vw;
    overflow-y: scroll;
  }
  @media screen and (max-width: 768px) {
    div {
      width: 90vw;
      margin-bottom: -20px;
    }
  }
`;
