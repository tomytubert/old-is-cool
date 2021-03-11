import React, { useState, useEffect } from "react";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
// import { useAuth } from "../../context/AuthContext.utils";
import { getBrands } from "../../service/brand.service";
import Select from "react-select";

const SellCar = () => {
  const initialState = {
    brand: "",
  };

  const [state, unsafeSetState] = useState(initialState);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const setState = useSafeDispatch(unsafeSetState);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const getAllBrands = async () => {
    try {
      const { data } = await getBrands();
      const newArr = [];
      data.forEach((brand) => {
        newArr.push({
          value: brand.name,
          label: brand.name,
        });
        setBrands(newArr)
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

    // if (newUser && newUser.message) {
    //   setError(newUser.message);
    // }

    setState(initialState);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type-Of-Car">¿Qué quieres anunciar?</label>
      <select name="typeOfCar" value={state.typeOfCar} onChange={handleChange}>
        <option value="coche">Coche</option>
        <option value="furgoneta">Furgoneta</option>
        <option value="camion">Camion</option>
      </select>
      {/* <label htmlFor="car-image">Añade fotos a tu anuncio</label>
      <input type="file" value={state.image} /> */}
      <label htmlFor="brand-car">¿Qué marca de coche es?</label>
      <Select
        defaultValue={brands[0]}
        options={brands}
        value={state.brand}
        onChange={handleChange} 
        // formatGroupLabel={formatGroupLabel}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="submit">Entra</button>
      <p>{error}</p>
    </form>
  );
};

export default SellCar;
