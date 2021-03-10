import React, { useState } from "react";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { useAuth } from "../../context/AuthContext.utils";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, unsafeSetState] = useState(initialState);
  const [error, setError] = useState("");
  const setState = useSafeDispatch(unsafeSetState);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await handleLogin(state);

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
      <button type="submit">Entra</button>
      <p>{error}</p>
    </form>
  );
};

export default Login;
