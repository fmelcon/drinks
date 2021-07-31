import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el context

export const CategoriasContext = createContext();

// Provider es donde se encuentras las funciones y states

const CategoriasProvider = (props) => {
  // Crear state del Context
  const [categorias, setCategorias] = useState([]);

  // Ejecutar el llamado a la API
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const categorias = await axios.get(url);
      setCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
