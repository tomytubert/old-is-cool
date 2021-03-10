import React, { useState } from "react";
import {useSafeDispatch} from "../../hooks/useSafeDispatch"
import { useAuth } from "../../context/AuthContext.utils";

const SingUp = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, unsafeSetState] = useState(initialState);
  const [error, setError] = useState("");

  const setState = useSafeDispatch(unsafeSetState) 

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const { handleSignup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await handleSignup(state);

    if (newUser && newUser.message) {
      setError(newUser.message);
    }
    setState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="submit">Registrate</button>
      <p>{error}</p>
    </form>
  );
};

export default SingUp;
