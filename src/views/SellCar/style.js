import styled from "styled-components";
import { VscDeviceCamera } from "react-icons/vsc";
import {FaTimes} from "react-icons/fa"

export const PhotoInput = styled.label`
  border: 0.5px solid lightgrey;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
`;
export const CameraICon = styled(VscDeviceCamera)`
  color: lightgray;
  margin-top: 20%;
`;

export const SmallPhotoIcon = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

export const SendBtn = styled.button`
  left:15%;
  background: white;
  color: black;
  box-shadow: 1px 6px 12px -5px #777;
  cursor: pointer;
  font-size: 1.5em;
  margin: auto 25px;
  padding: 20px 50px;
  border: 0;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  border-radius: 40px;
  width: 60%;
  position: fixed;
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
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 10px -5px #777;
`;
