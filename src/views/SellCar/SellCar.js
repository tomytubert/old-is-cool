import React, { useState, useEffect } from "react";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { getBrands } from "../../service/brand.service";
import { createAdvert, uploadFile } from "../../service/advert.service";
import { typeOfCar, fuel, colors, typeOfTransmision, getAllAddress } from "./data";
import Select from "react-select";
import YearPicker from "react-year-picker";
import { useAuth } from "../../context/AuthContext.utils";

const SellCar = () => {
  const {user} = useAuth()

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
      console.log("value",e.value);
    }
    if (e.target) {
      unsafeSetState({ ...state, [e.target.name]: e.target.value });
      console.log("target",e.value);
    }
    if (typeof e === "number") {
      unsafeSetState({ ...state, year: e });
    }
  };
  console.log("state",state);
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
    <>
      {loading ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="type-Of-Car">¿Qué quieres anunciar?</label>
          <Select
            placeholder={typeOfCar[0].value}
            defaultValue={""}
            options={typeOfCar}
            onChange={handleChange}
          />

          <label htmlFor="address">Provincia</label>
          <Select
            placeholder={getAllAddress()[0].value}
            defaultValue={""}
            options={getAllAddress()}
            onChange={handleChange}
          />

          <label htmlFor="car-image">Añade fotos a tu anuncio</label>
          <input type="file" name="image" onChange={handleUpload} />
          <input type="file" name="image" onChange={handleUpload} />
          <input type="file" name="image" onChange={handleUpload} />
          <input type="file" name="image" onChange={handleUpload} />
          <input type="file" name="image" onChange={handleUpload} />

          <label htmlFor="brand-car">¿Qué marca de coche es?</label>
          <Select
            placeholder={brands[0].value}
            defaultValue={""}
            options={brands}
            onChange={handleChange}
          />

          <label htmlFor="year">Año</label>
          <YearPicker name="year" onChange={handleChange} />

          <label htmlFor="fuel">Combustible</label>
          <Select
            placeholder={fuel[0].value}
            defaultValue={""}
            options={fuel}
            onChange={handleChange}
          />

          <label htmlFor="typeOfTransmision">Tipo de cambio</label>
          <Select
            placeholder={typeOfTransmision[0].value}
            defaultValue={""}
            options={typeOfTransmision}
            onChange={handleChange}
          />

          <label htmlFor="Kilometraje">Km</label>
          <input
            type="number"
            name="km"
            onChange={handleChange}
            value={state.km}
          />

          <label htmlFor="model">Modelo</label>
          <input
            type="text"
            name="model"
            onChange={handleChange}
            value={state.model}
          />

          <label htmlFor="Cavallos">CV</label>
          <input
            type="number"
            name="horsePower"
            onChange={handleChange}
            value={state.horsePower}
          />

          <label htmlFor="color">Color</label>
          <Select
            placeholder={colors[0].value}
            defaultValue={""}
            options={colors}
            onChange={handleChange}
          />

          <label htmlFor="Precio">Precio</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={state.price}
          />

          <label htmlFor="Otra-informacion">¿Quieres indicar algo más?</label>
          <textarea
            name="otherInformation"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={state.otherInformation}
          />

          <button type="submit">Vender</button>
          {/* <p>{error}</p> */}
        </form>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default SellCar;
