import React from "react";
import "./App.css";
import HomePage from "./views/HomePage/HomePage";
import Navbar from "./components/Layout/Navbar";
import Login from "./views/Login/Login";
import SingUp from "./views/SingUp/SingUp";
import AnonRoute from "./components/Routes/AnonRoute"
import SellCar from "./views/SellCar/SellCar"
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/vender-mi-coche-clasico" component={SellCar} />
        <AnonRoute exact path="/signup">
          <SingUp />
        </AnonRoute>
        <AnonRoute exact path="/login">
          <Login />
        </AnonRoute>
      </Switch>
    </div>
  );
}

export default App;
