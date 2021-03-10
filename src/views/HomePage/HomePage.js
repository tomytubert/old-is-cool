import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main>
      <Link to="coches-clasicos">
        <button>Ecuentra Tu Coche</button>
      </Link>
      <Link to="vender-mi-coche-clasico">
        <button>Vende</button>
      </Link>
    </main>
  );
};

export default HomePage;
