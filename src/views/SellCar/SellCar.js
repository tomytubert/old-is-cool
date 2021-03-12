import React, { useState, useEffect } from "react";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { getBrands } from "../../service/brand.service";
import { createAdvert } from "../../service/advert.service";
import { typeOfCar, fuel, colors, typeOfTransmision } from "./data";
import Select from "react-select";
import YearPicker from "react-year-picker";

const SellCar = () => {
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
    image: "",
    otherInformation: "",
  };

  const [state, unsafeSetState] = useState(initialState);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  const setState = useSafeDispatch(unsafeSetState);

  const handleChange = (e) => {
    if (e.value) {
      setState({ ...state, [e.name]: e.value });
    }
    if (e.target) {
      setState({ ...state, [e.target.name]: e.target.value });
    }
    if (typeof e === "number") {
      setState({ ...state, year: e });
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
    const newAdvert = await createAdvert(state);
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

          <label htmlFor="car-image">Añade fotos a tu anuncio</label>
          <input type="file" value={state.image} onChange={handleChange} />

          <label htmlFor="brand-car">¿Qué marca de coche es?</label>
          <Select
            placeholder={brands[0].value}
            defaultValue={""}
            options={brands}
            onChange={handleChange}
          />

          <label htmlFor="year">Año</label>
          <YearPicker name="year" onChange={handleChange} value={state.year} />

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
