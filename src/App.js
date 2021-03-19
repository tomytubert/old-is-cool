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

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [renderNav, setRenderNav] = React.useState(true);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleRenderNav = () => {
    setRenderNav(prev => !prev);
  };
  return (
    <div className="App">
      {renderNav && (
        <>
          <Navbar handleToggle={handleToggle} />
          <SideBar isOpen={isOpen} handleToggle={handleToggle} />
        </>
      )}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/coches-clasicos/:model/:advertId"
        >
          <AdvertDetail handleRenderNav={handleRenderNav} />
        </Route>
        <Route exact path="/coches-clasicos" component={AdvertList} />
        <AnonRoute exact path="/signup">
          <SingUp />
        </AnonRoute>
        <AnonRoute exact path="/login">
          <Login />
        </AnonRoute>
        <PrivateRoute exact path="/vender-mi-coche-clasico">
          <SellCar handleRenderNav={handleRenderNav} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
