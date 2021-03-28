import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { useAuth } from "../../context/AuthContext.utils";
import { BtnType } from "./style";
import { Btn } from "../HomePage/style";
import { BsArrowRightShort } from "react-icons/bs";
import Loading from "../../components/Loading/Loading";

const SingUp = ({ handleRenderNavNone }) => {
  const initialState = {
    email: "",
    password: "",
    type: "",
    img: ""
  };
  const { handleSignup } = useAuth();
  const [state, unsafeSetState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setState = useSafeDispatch(unsafeSetState);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await handleSignup(state);
    
    if (newUser && newUser.message) {
      setError(newUser.message);
    }
    setState(initialState);
  };

  useEffect(() => {
    setTimeout(() => setLoading(true), 500);
    handleRenderNavNone()
  }, []);

  return (
    <>
      {loading ? (
        <section className="authBackground" style={{ height: "100vh" }}>
          <div>
            <h1 className="authTitles titlesShadow">
              Encuentra
              <p className="authTitles" style={{ padding: "0" }}>
                el coche
              </p>
              de tus sueños
            </h1>
          </div>
          <div
            className="boxShadow"
            id="loginBox"
          >
            <form onSubmit={handleSubmit} className="flexColumn margin10">
              <Btn
                type="submit"
                id="submitBtnSingUp"
              >
                <BsArrowRightShort size={40} />
              </Btn>
              <label
                htmlFor="email"
                style={{ textAlign: "start" }}
                className="margin10"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="margin10 inputBackgroundGrey"
                value={state.email}
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                style={{ textAlign: "start" }}
                className="margin10"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                className="margin10 inputBackgroundGrey"
                value={state.password}
                onChange={handleChange}
              />
              <label style={{ textAlign: "start" }} className="margin10">
                ¿Qué eres?
              </label>
              <div
                style={{ display: "flex", justifyContent: "space-evenly" }}
                className="margin10"
              >
                <BtnType
                  style={{ width: "auto" }}
                  className="margin10"
                  onClick={() => setState({ ...state, type: "Empresa" })}
                >
                  Empresa
                </BtnType>
                <BtnType
                  style={{ width: "auto" }}
                  className="margin10"
                  onClick={() => setState({ ...state, type: "Particular" })}
                >
                  Particular
                </BtnType>
              </div>
              <p style={{ textTransform: "uppercase" }}>{error}</p>
              <div style={{ textAlign: "center", margin: " 40px 0" }}>
                ¿Ya tienes cuenta?
                <Link
                  style={{ textDecoration: "none", color: "#08a045" }}
                  to="/login"
                >
                  Entra aqui
                </Link>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SingUp;
