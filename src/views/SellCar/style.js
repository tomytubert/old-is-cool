import styled from "styled-components";
import { VscDeviceCamera } from "react-icons/vsc";
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
