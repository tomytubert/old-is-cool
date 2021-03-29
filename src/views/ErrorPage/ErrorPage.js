import { useHistory } from "react-router-dom";
import { Btn } from "../HomePage/style";

const NotFound = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  // useEffect(() => {
  //   handleRenderNavYes();
  // }, []);
  return (
    <>
      <div
        className="margin0Auto positionCenterDiv"
        style={{ height: "500px", width: "300px" }}
      >
        <div>
          <h2 className="textAlignCenter" style={{ marginTop: "-60px" }}>
            Vaya!, Hemos tendio un Error
          </h2>
          <p className="textAlignCenter" style={{ marginTop: "20px" }}>
            ¿Que tal si vuelves al punto de partida o vuelves atras?
          </p>
        </div>
        <Btn style={{ marginTop: "50px" }} onClick={goBack}>
          Volver
        </Btn>
      </div>
    </>
  );
};

export default NotFound;
