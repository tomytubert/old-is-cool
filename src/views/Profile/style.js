import styled from "styled-components";
import { VscDeviceCamera } from "react-icons/vsc";
import {FaTimes} from "react-icons/fa"

export const ProfilePhoto = styled.label`
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  height:100px;
  width:100px;
  position: absolute;
`;
export const ProfilePhotoUpDate = styled.label`
  border: 0.5px solid lightgrey;
  height:100px;
  width:100px;
  border-radius: 10px;
  position: absolute;
`;

export const CameraICon = styled(VscDeviceCamera)`
  color: lightgray;
`;

export const ProfilePhotoIcon = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

export const BtnTab = styled.button`
  background-color: rgba(11,110,79,0.1);
  color: black;
  cursor: pointer;
  font-size: 17px;
  padding: 10px 20px;
  border: 0;
  border-radius: 10px;
  margin: 10px;
  text-transform: uppercase;
  font-family: "Lato", serif;
  font-weight: 600;
  text-transform: uppercase;
  color: #3e4643;
  &:hover{
    background-color: rgba(11,110,79,0.3);
  }
  &:active{
    background-color: rgba(11,110,79,0.3);
    border-bottom: 1px solid #0b6e4f;
  }
  &:after{
    background-color: rgba(11,110,79,0.3);
    border-bottom: 1px solid #0b6e4f;
  }
  @media (min-width: 768px){
  padding:20px 40px;
  font-size:20px;
}
`;

export const EditContainer = styled.aside`
position:fixed;
z-index:${props => props.isOpen ? "999" : "0"};
width:100%;
height:100%;
background:white;
align-items:center;
left:0;
transition: 0.4s ease-in-out;
opacity:${props => props.isOpen ? "100%" : "0"};
top:${props => props.isOpen ? "0": "-100%"};
`