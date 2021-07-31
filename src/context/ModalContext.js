import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// crear el context

export const ModalContext = createContext();

const ModalProvider = (props) => {
  // state del provider

  const [idreceta, setIdReceta] = useState(null);
  const [receta, setReceta] = useState({});

  // una vez que tenemos una receta, llamar la API

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);
      setReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider value={{ receta, setIdReceta, setReceta }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
