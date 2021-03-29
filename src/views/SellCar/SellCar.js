import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.utils";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types"
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { getBrands } from "../../service/brand.service";
import {
  createAdvert,
  uploadFile,
  getAdvert,
  updateAdvertService,
} from "../../service/advert.service";
import {
  typeOfCar,
  fuel,
  colors,
  typeOfTransmision,
  getAllAddress,
  fromWhere,
} from "./data";
import { CloseIcon, Icon } from "../../components/Layout/style";
import {
  CameraICon,
  PhotoInput,
  SmallPhotoIcon,
  SendBtn,
  OptionsBar,
  ErrorModal,
} from "./style";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loading from "../../components/Loading/Loading";
import Select from "react-select";
import YearPicker from "react-year-picker";


const SellCar = ({ handleRenderNavNone }) => {
  const { user } = useAuth();
  const history = useHistory();
  const { advertId } = useParams();

  const initialState = {
    brand: "",
    user: user.id,
    typeOfCar: "",
    year: "",
    fuel: "",
    typeOfTransmision: "",
    km: "",
    model: "",
    horsePower: "",
    color: "",
    image: [],
    otherInformation: "",
    price: 0,
    address: "",
    fromWhere: "",
  };

  const yearPickerRef = React.useRef();
  const [state, unsafeSetState] = useState(initialState);
  const [brands, setBrands] = useState([]);
  const [updateAdvert, setUpdateAdvert] = useState(initialState);
  const [updateWiew, setUpdateView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});
  const [error, setError] = useState("");
  const [badSubmit,setBadSubmit] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);


  const setState = useSafeDispatch(unsafeSetState);

  const handleToggleErrorModal = () => {
    setOpenErrorModal(!openErrorModal);
  };

  const handleChange = (e) => {
    if (!advertId) {
      if (e.value) {
        unsafeSetState({ ...state, [e.name]: e.value });
      }
      if (e.target) {
        unsafeSetState({ ...state, [e.target.name]: e.target.value });
      }
      if (typeof e === "number") {
        unsafeSetState({ ...state, year: e });
      }
    }
    if (e.value) {
      setUpdateAdvert({ ...updateAdvert, [e.name]: e.value });
    }
    if (e.target) {
      setUpdateAdvert({ ...updateAdvert, [e.target.name]: e.target.value });
    }
    if (typeof e === "number") {
      setUpdateAdvert({ ...updateAdvert, year: e });
    }
  };

  const handleUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("image", e.target.files[0]);
      const { data } = await uploadFile(uploadData);

      if (!advertId) {
        setImages((state) => ({ ...state, [e.target.name]: data }));
        const imageCopy = state.image.concat(data);
        unsafeSetState({ ...state, image: imageCopy });
      }

      setImages((state) => ({ ...state, [e.target.name]: data }));
      const imageCopy = updateAdvert.image.concat(data);
      setUpdateAdvert({ ...updateAdvert, image: imageCopy });
    } catch (e) {
      console.error(e);
    }
  };

  const getAllBrands = async () => {
    try {
      const { data } = await getBrands();
      const newArr = [];
      data.forEach((brand) => {
        newArr.push({
          value: brand.name,
          label: brand.name,
          name: "brand",
        });
        setBrands(newArr);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getAdvertLoQueSea = async () => {
    const { data } = await getAdvert(advertId);
    if (data._id) {
      setUpdateView(true);
    }
    setUpdateAdvert(data);

    if (updateAdvert._id) {
      setLoading(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!advertId) {
        await createAdvert(state);
        setState(initialState);
      } else {
        await updateAdvertService(updateAdvert);
      }
      goBack();
    } catch (e) {
      console.error(e);
      setBadSubmit(true)
      handleToggleErrorModal();
      setError(e.response.data.message);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (advertId) {
      getAdvertLoQueSea();
    }
    getAllBrands();
    handleRenderNavNone();
    setLoading(true);
  }, []);

  return (
    <section>
      {loading ? (
        <>
          <OptionsBar
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <IoIosArrowRoundBack
              size={50}
              style={{ marginLeft: "10px" }}
              onClick={goBack}
            />
          </OptionsBar>
          {updateWiew ? (
            <form
              onSubmit={handleSubmit}
              className="flexColumn margin10 sellCar"
            >
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {[...Array(8)].map((item, idx) => (
                  <PhotoInput>
                    {updateAdvert.image[idx] ? (
                      <SmallPhotoIcon src={updateAdvert.image[idx]} />
                    ) : (
                      <>
                        {images[`${idx}`] ? (
                          <SmallPhotoIcon src={images[`${idx}`]} />
                        ) : (
                          <CameraICon size={30} />
                        )}
                        <input
                          type="file"
                          name={`${idx}`}
                          onChange={handleUpload}
                        />
                      </>
                    )}
                  </PhotoInput>
                ))}
              </div>

              <label htmlFor="type-Of-Car" className="margin10 lineBottom">
                ¿Qué quieres anunciar?
              </label>
              <Select
                placeholder={
                  updateAdvert.typeOfCar
                    ? updateAdvert.typeOfCar
                    : "Tipo de coche"
                }
                defaultValue={updateAdvert.typeOfCar}
                options={typeOfCar}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />

              <label htmlFor="address" className="margin10 lineBottom">
                Provincia
              </label>
              <Select
                placeholder={
                  updateAdvert.address
                    ? updateAdvert.address
                    : getAllAddress()[0].value
                }
                defaultValue={updateAdvert.address}
                options={getAllAddress()}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />

              <label htmlFor="de donde viene" className="margin10 lineBottom">
                ¿De donde es?
              </label>
              <Select
                placeholder={
                  updateAdvert.fromWhere
                    ? updateAdvert.fromWhere
                    : fromWhere[0].value
                }
                defaultValue={updateAdvert.fromWhere}
                options={fromWhere}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />
              <label htmlFor="brand-car" className="margin10 lineBottom">
                ¿Qué marca de coche es?
              </label>
              <Select
                placeholder={updateAdvert.brand ? updateAdvert.brand : "Abarth"}
                defaultValue={updateAdvert.brand}
                options={brands}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />

              <label htmlFor="year" className="margin10 lineBottom">
                Año
              </label>
              <YearPicker
              ref={yearPickerRef}
                name="year"
                onChange={handleChange}
                className="margin10"
                placeholder="Selecciona el año"
              />

              <label htmlFor="fuel" className="margin10 lineBottom">
                Combustible
              </label>
              <Select
                placeholder={
                  updateAdvert.fuel ? updateAdvert.fuel : fuel[0].value
                }
                defaultValue={updateAdvert.fuel}
                options={fuel}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />

              <label
                htmlFor="typeOfTransmision"
                className="margin10 lineBottom"
              >
                Tipo de cambio
              </label>
              <Select
                placeholder={
                  updateAdvert.typeOfTransmision
                    ? updateAdvert.typeOfTransmision
                    : typeOfTransmision[0].value
                }
                defaultValue={updateAdvert.typeOfTransmision}
                options={typeOfTransmision}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />

              <label htmlFor="Kilometraje" className="margin10 lineBottom">
                ¿Cuantos km tiene?
              </label>
              <input
                placeholder={updateAdvert.km ? updateAdvert.km : "km"}
                type="number"
                name="km"
                onChange={handleChange}
                value={updateAdvert.km}
                className="margin10 width70vw leftMargin18"
              />

              <label htmlFor="model" className="margin10 lineBottom">
                Modelo
              </label>
              <input
                placeholder={
                  updateAdvert.model ? updateAdvert.model : "Mustang Fastback*"
                }
                type="text"
                name="model"
                onChange={handleChange}
                value={updateAdvert.model}
                className="margin10 width70vw leftMargin18"
              />

              <label htmlFor="Caballos" className="margin10 lineBottom">
                CV
              </label>
              <input
                placeholder={
                  updateAdvert.horsePower ? updateAdvert.horsePower : "200*"
                }
                type="number"
                name="horsePower"
                onChange={handleChange}
                value={updateAdvert.horsePower}
                className="margin10 width70vw leftMargin18"
              />

              <label htmlFor="color" className="margin10 lineBottom">
                Color
              </label>
              <Select
                placeholder={
                  updateAdvert.color ? updateAdvert.color : colors[0].value
                }
                defaultValue={updateAdvert.color}
                options={colors}
                onChange={handleChange}
                className="margin10 width70vw"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />

              <label htmlFor="Precio" className="margin10 lineBottom">
                Precio
              </label>
              <input
                placeholder={updateAdvert.price ? updateAdvert.price : "30000*"}
                type="number"
                name="price"
                onChange={handleChange}
                value={updateAdvert.price}
                className="margin10 width70vw leftMargin18"
              />

              <label htmlFor="Otra-informacion" className="margin10 lineBottom">
                ¿Quieres indicar algo más?
              </label>
              <textarea
                placeholder={
                  updateAdvert.otherInformation
                    ? updateAdvert.otherInformation
                    : "Cuentanos un poco sobre los extras y la vida que ha tenido...."
                }
                name="otherInformation"
                cols="30"
                rows="10"
                onChange={handleChange}
                value={updateAdvert.otherInformation}
                className="margin10 width70vw"
              />

              <SendBtn type="submit" className="margin10">
                Editar
              </SendBtn>
            </form>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flexColumn margin10 sellCar"
              >
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {[...Array(8)].map((item, idx) => (
                    <PhotoInput>
                      {images[`${idx}`] ? (
                        <SmallPhotoIcon src={images[`${idx}`]} />
                      ) : (
                        <CameraICon badSubmit={!badSubmit ? false : !images[0] ? true : false} size={30} />
                      )}
                      <input
                        type="file"
                        name={`${idx}`}
                        onChange={handleUpload}
                      />
                    </PhotoInput>
                  ))}
                </div>

                <label htmlFor="type-Of-Car" className={!badSubmit ? "margin10 lineBottom" : !state.typeOfCar ? "margin10 redErrorLabelBottom" : "margin10 lineBottom" } >
                  ¿Qué quieres anunciar?
                </label>
                <Select
                  placeholder="Tipo de coche"
                  defaultValue={""}
                  options={typeOfCar}
                  onChange={handleChange}
                  className={`margin10 width70vw`}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />

                <label htmlFor="address" className="margin10 lineBottom">
                  Provincia
                </label>
                <Select
                  placeholder={getAllAddress()[0].value}
                  defaultValue={""}
                  options={getAllAddress()}
                  onChange={handleChange}
                  className="margin10 width70vw"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />

                <label htmlFor="de donde viene" className="margin10 lineBottom">
                  ¿De donde es?
                </label>
                <Select
                  placeholder={fromWhere[0].value}
                  defaultValue={""}
                  options={fromWhere}
                  onChange={handleChange}
                  className="margin10 width70vw"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />
                <label htmlFor="brand-car" className={!badSubmit ? "margin10 lineBottom" : !state.brand ? "margin10 redErrorLabelBottom" : "margin10 lineBottom" }>
                  ¿Qué marca de coche es?
                </label>
                <Select
                  placeholder={"Abarth"}
                  defaultValue={""}
                  options={brands}
                  onChange={handleChange}
                  className="margin10 width70vw"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />

                <label htmlFor="year" className={!badSubmit ? "margin10 lineBottom" : !state.year ? "margin10 redErrorLabelBottom" : "margin10 lineBottom" }>
                  Año
                </label>
                <YearPicker
                  ref={yearPickerRef}
                  name="year"
                  onChange={handleChange}
                  className="margin10"
                  placeholder="Selecciona el año"
                />

                <label htmlFor="fuel" className="margin10 lineBottom">
                  Combustible
                </label>
                <Select
                  placeholder={fuel[0].value}
                  defaultValue={""}
                  options={fuel}
                  onChange={handleChange}
                  className="margin10 width70vw"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />

                <label
                  htmlFor="typeOfTransmision"
                  className="margin10 lineBottom"
                >
                  Tipo de cambio
                </label>
                <Select
                  placeholder={typeOfTransmision[0].value}
                  defaultValue={""}
                  options={typeOfTransmision}
                  onChange={handleChange}
                  className="margin10 width70vw"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />

                <label htmlFor="Kilometraje" className="margin10 lineBottom">
                  ¿Cuantos km tiene?
                </label>
                <input
                  placeholder="km"
                  type="number"
                  name="km"
                  onChange={handleChange}
                  value={state.km}
                  className="margin10 width70vw leftMargin18"
                />

                <label htmlFor="model" className={!badSubmit ? "margin10 lineBottom" : !state.model ? "margin10 redErrorLabelBottom" : "margin10 lineBottom" }>
                  Modelo
                </label>
                <input
                  placeholder="Mustang Fastback*"
                  type="text"
                  name="model"
                  onChange={handleChange}
                  value={state.model}
                  className="margin10 width70vw leftMargin18"
                />

                <label htmlFor="Caballos" className="margin10 lineBottom">
                  CV
                </label>
                <input
                  placeholder="200*"
                  type="number"
                  name="horsePower"
                  onChange={handleChange}
                  value={state.horsePower}
                  className="margin10 width70vw leftMargin18"
                />

                <label htmlFor="color" className="margin10 lineBottom">
                  Color
                </label>
                <Select
                  placeholder={colors[0].value}
                  defaultValue={""}
                  options={colors}
                  onChange={handleChange}
                  className="margin10 width70vw"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary75: "#54CC51",
                      primary: "#08a045",
                      primary50: "#BEF0BE",
                      primary25: "#D5F0DB",
                    },
                  })}
                />

                <label htmlFor="Precio" className="margin10 lineBottom">
                  Precio
                </label>
                <input
                  placeholder="30000*"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={state.price}
                  className="margin10 width70vw leftMargin18"
                />

                <label
                  htmlFor="Otra-informacion"
                  className="margin10 lineBottom"
                >
                  ¿Quieres indicar algo más?
                </label>
                <textarea
                  placeholder="Cuentanos un poco sobre los extras y la vida que ha tenido...."
                  name="otherInformation"
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                  value={state.otherInformation}
                  className="margin10 width70vw"
                />

                <SendBtn type="submit" className="margin10">
                  Vender
                </SendBtn>
              </form>
              <ErrorModal
                isOpen={openErrorModal}
                onClick={() => {
                  handleToggleErrorModal();
                }}
              >
                <Icon style={{ top: "35%" }}>
                  <CloseIcon
                    style={{ color: "white" }}
                    onClick={() => {
                      handleToggleErrorModal();
                    }}
                  />
                </Icon>
                <div
                  className="positionCenterDiv"
                  id="errorMessageForms"
                  style={{ backgroundColor: "white" }}
                >
                  <p>{error}</p>
                </div>
              </ErrorModal>
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

SellCar.defaultProps = {
  handleRenderNavNone: () => {
    return false
  }
}
SellCar.propTypes = {
  handleRenderNavNone: PropTypes.func
}

export default SellCar;
