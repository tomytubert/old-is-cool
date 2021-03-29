import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"
import Img from "../../img/NL_Route_404.svg";
import {Btn} from "../HomePage/style"

const NotFound = ({handleRenderNavYes}) => {
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    useEffect(()=>{
        handleRenderNavYes()
    },[])
  return (
    <>
      <div
        className="margin0Auto positionCenterDiv"
        style={{ height: "500px", width: "300px" }}
      >
        <div id="wrapperNotFoundPhoto">
          <img alt="404 Route" src={Img} id="notFoundPhoto" />
        </div>
        <div>
          <h2 className="textAlignCenter" style={{marginTop:"-60px"}}>Error!</h2>
          <p className="textAlignCenter" style={{marginTop:"20px"}}>
            Parece que te has perdido,
            <br /> ¿que tal si vuelves al punto de partida o vuelves atras?
          </p>
        </div>
        <Btn style={{marginTop: "50px"}} onClick={goBack}>Volver</Btn>
      </div>
    </>
  );
};

export default NotFound;
