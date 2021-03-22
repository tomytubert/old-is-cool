import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSafeDispatch } from "../../hooks/useSafeDispatch";
import { useAuth } from "../../context/AuthContext.utils";
import { BsArrowRightShort } from "react-icons/bs";
import { Btn } from "../HomePage/style";
import Loading from "../../components/Loading/Loading";

const Login = ({ handleRenderNav }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, unsafeSetState] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [passwordValidator, setPasswordValidator] = useState(false)
  const setState = useSafeDispatch(unsafeSetState);

  const verifyValidators = () => {
    const EMAIL_REGEX = new RegExp("/S+@S+.S+/");
    if (state.email === EMAIL_REGEX) {
      console.log("hola");
    }
  };
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
    verifyValidators();
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

  useEffect(() => {
    handleRenderNav();
    setTimeout(() => setLoading(true), 500);
  }, []);

  return (
    <>
      {loading ? (
        <section className="authBackground" style={{ height: "100vh" }}>
          <div>
            <h1 className="authTitles titlesShadow">
              Encuentra{" "}
              <p className="authTitles" style={{ padding: "0" }}>
                el coche
              </p>{" "}
              de tus sueños
            </h1>
          </div>
          <div
            className="boxShadow"
            style={{
              position: "fixed",
              bottom: 0,
              paddingBottom: "30px",
              width: "100vw",
              backgroundColor: "white",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <form onSubmit={handleSubmit} className="flexColumn margin10">
              <Btn
                type="submit"
                style={{
                  width: "80px",
                  height: "80px",
                  position: "absolute",
                  left: "70vw",
                  top: "-40px",
                  zIndex: 10,
                  color: "#08a045",
                }}
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
              <p style={{ textTransform: "uppercase" }}>{error}</p>
              <div style={{ textAlign: "center", margin: " 40px 0" }}>
                ¿No tienes cuenta?
                <Link
                  style={{ textDecoration: "none", color: "#08a045" }}
                  to="/signup"
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

export default Login;
