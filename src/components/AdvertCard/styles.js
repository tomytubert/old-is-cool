import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const Advert = styled.div`
  text-align: center;
  /* position: absolute;
  left: 50%;
  transform: translate(-50%); */
  margin:15px 0;
  flex: 0 1 50%;
`;
export const AdvertWrapPhoto = styled.div`
  /* border-radius:15%; */
  /* box-shadow: 1px 0 10px -5px #777; */
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content:center;
`;

export const AdvertInformation = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AdvertTitle = styled.div`
  h3 {
    color: black;
    font-size: 25px;
    margin-right: 130px;
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
`;

export const AdvertPhoto = styled.img`
  width: 313px;
  height: 270px;
  object-fit: cover;
  border-radius: 10%;
  box-shadow: 1px 0 15px -5px #777;
`;
