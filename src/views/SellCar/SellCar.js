import React, { useState, useEffect } from "react";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { getBrands } from "../../service/brand.service";
import { createAdvert, uploadFile } from "../../service/advert.service";
import {
  typeOfCar,
  fuel,
  colors,
  typeOfTransmision,
  getAllAddress,
} from "./data";
import { CameraICon, PhotoInput,SmallPhotoIcon } from "./style";
import Select from "react-select";
import YearPicker from "react-year-picker";
import { useAuth } from "../../context/AuthContext.utils";

const SellCar = () => {
  const { user } = useAuth();
  console.log(user);

  const initialState = {
    brand: "",
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
    // user: user.id
  };

  const [state, unsafeSetState] = useState(initialState);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  const setState = useSafeDispatch(unsafeSetState);

  const handleChange = (e) => {
    if (e.value) {
      unsafeSetState({ ...state, [e.name]: e.value });
      console.log("value", e.value);
    }
    if (e.target) {
      unsafeSetState({ ...state, [e.target.name]: e.target.value });
      console.log("target", e.value);
    }
    if (typeof e === "number") {
      unsafeSetState({ ...state, year: e });
    }
  };
  console.log("state", state);
  const handleUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("image", e.target.files[0]);

      const { data } = await uploadFile(uploadData);
      const imageCopy = state.image.concat(data);
      unsafeSetState({ ...state, image: imageCopy });
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
        setLoading(true);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAdvert(state);
    setState(initialState);
  };
  return (
    <section>
      {loading ? (
        <form
          onSubmit={handleSubmit}
          className="flexColumn margin10"
          style={{ paddingBottom: "100px" }}
        >
          <div style={{ marginTop: "20px", display: "flex",justifyContent:"center" }}>
            <div>
              <div style={{ display: "flex" }}>
                <PhotoInput>
                  {state.image[0] ? <SmallPhotoIcon src={state.image[0]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
                <PhotoInput>
                  {state.image[1] ? <SmallPhotoIcon src={state.image[1]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
              </div>
              <div style={{ display: "flex" }}>
                <PhotoInput>
                  {state.image[4] ? <SmallPhotoIcon src={state.image[4]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
                <PhotoInput>
                  {state.image[5] ? <SmallPhotoIcon src={state.image[5]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
              </div>
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <PhotoInput>
                  {state.image[2] ? <SmallPhotoIcon src={state.image[2]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
                <PhotoInput>
                  {state.image[3] ? <SmallPhotoIcon src={state.image[3]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
              </div>
              <div style={{ display: "flex" }}>
                <PhotoInput>
                  {state.image[6] ? <SmallPhotoIcon src={state.image[6]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
                <PhotoInput>
                  {state.image[7] ? <SmallPhotoIcon src={state.image[7]} /> : <CameraICon size={30} />}
                  <input type="file" name="image" onChange={handleUpload} />
                </PhotoInput>
              </div>
            </div>
          </div>

          <label htmlFor="type-Of-Car" className="margin10">
            ¿Qué quieres anunciar?
          </label>
          <Select
            placeholder={typeOfCar[0].value}
            defaultValue={""}
            options={typeOfCar}
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="address" className="margin10">
            Provincia
          </label>
          <Select
            placeholder={getAllAddress()[0].value}
            defaultValue={""}
            options={getAllAddress()}
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="brand-car" className="margin10">
            ¿Qué marca de coche es?
          </label>
          <Select
            placeholder={brands[0].value}
            defaultValue={""}
            options={brands}
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="year" className="margin10">
            Año
          </label>
          <YearPicker
            name="year"
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="fuel" className="margin10">
            Combustible
          </label>
          <Select
            placeholder={fuel[0].value}
            defaultValue={""}
            options={fuel}
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="typeOfTransmision" className="margin10">
            Tipo de cambio
          </label>
          <Select
            placeholder={typeOfTransmision[0].value}
            defaultValue={""}
            options={typeOfTransmision}
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="Kilometraje" className="margin10">
            Km
          </label>
          <input
            type="number"
            name="km"
            onChange={handleChange}
            value={state.km}
            className="margin10 width70vw"
          />

          <label htmlFor="model" className="margin10">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            onChange={handleChange}
            value={state.model}
            className="margin10 width70vw"
          />

          <label htmlFor="Cavallos" className="margin10">
            CV
          </label>
          <input
            type="number"
            name="horsePower"
            onChange={handleChange}
            value={state.horsePower}
            className="margin10 width70vw"
          />

          <label htmlFor="color" className="margin10">
            Color
          </label>
          <Select
            placeholder={colors[0].value}
            defaultValue={""}
            options={colors}
            onChange={handleChange}
            className="margin10 width70vw"
          />

          <label htmlFor="Precio" className="margin10">
            Precio
          </label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={state.price}
            className="margin10 width70vw"
          />

          <label htmlFor="Otra-informacion" className="margin10">
            ¿Quieres indicar algo más?
          </label>
          <textarea
            name="otherInformation"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={state.otherInformation}
            className="margin10 width70vw"
          />

          <button type="submit" className="margin10">
            Vender
          </button>
          {/* <p>{error}</p> */}
        </form>
      ) : (
        "loading..."
      )}
    </section>
  );
};

export default SellCar;
