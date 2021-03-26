import React from "react";
import "./App.css";
import HomePage from "./views/HomePage/HomePage";
import Navbar from "./components/Layout/Navbar";
import Login from "./views/Login/Login";
import SingUp from "./views/SingUp/SingUp";
import AnonRoute from "./components/Routes/AnonRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdvertDetail from "./views/AdvertDetail/AdvertDetail";
import SellCar from "./views/SellCar/SellCar";
import { Switch, Route, useParams } from "react-router-dom";
import AdvertList from "./views/AdvertList/AdvertList";
import SideBar from "./components/Layout/SideBar";
import Profile from "./views/Profile/Profile";
import Messages from "./views/Messages/Messages";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [renderNav, setRenderNav] = React.useState(true);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleRenderNavNone = () => {
    setRenderNav(false);
  };
  const handleRenderNavYes = () => {
    setRenderNav(true);
  };
  console.log(renderNav);
  return (
    <div className="App">
      {renderNav && (
        <>
          <Navbar handleToggle={handleToggle} />
          <SideBar isOpen={isOpen} handleToggle={handleToggle} />
        </>
      )}
      <Switch>
        <Route exact path="/" >
        <HomePage handleRenderNavYes={handleRenderNavYes} />
        </Route>
        <Route exact path="/coches-clasicos/:model/:advertId">
          <AdvertDetail handleRenderNavNone={handleRenderNavNone} />
        </Route>
        <Route exact path="/coches-clasicos/:query">
          <AdvertList handleRenderNavYes={handleRenderNavYes}  />
        </Route>
        <Route exact path="/coches-clasicos">
          <AdvertList  handleRenderNavYes={handleRenderNavYes}  />
        </Route>
        <AnonRoute exact path="/signup">
          <SingUp handleRenderNavNone={handleRenderNavNone} />
        </AnonRoute>
        <AnonRoute exact path="/login">
          <Login handleRenderNavNone={handleRenderNavNone} />
        </AnonRoute>
        <PrivateRoute exact path="/vender-mi-coche-clasico">
          <SellCar handleRenderNavNone={handleRenderNavNone} />
        </PrivateRoute>
        <PrivateRoute exact path="/mensajes/:userId">
          <Messages handleRenderNavYes={handleRenderNavYes} />
        </PrivateRoute>
        <PrivateRoute exact path="/editar/:advertId">
          <SellCar handleRenderNavNone={handleRenderNavNone} />
        </PrivateRoute>
        <PrivateRoute exact path="/profile/:userId">
          <Profile handleRenderNavNone={handleRenderNavNone} handleRenderNavYes={handleRenderNavYes} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
