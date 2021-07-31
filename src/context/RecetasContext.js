import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recipe, setRecipe] = useState([]);
  const [search, searchRecipe] = useState({
    nombre: "",
    categoria: "",
  });
  const [ask, setAsk] = useState(false);

  const { nombre, categoria } = search;

  useEffect(() => {
    if (ask) {
      const obtenerReceta = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

        const resultado = await axios.get(url);
        // console.log(resultado.data.drinks);
        setRecipe(resultado.data.drinks);
      };
      obtenerReceta();
      setAsk(false);
    }
  }, [ask, categoria, nombre, search]);

  return (
    <RecetasContext.Provider value={{ recipe, searchRecipe, setAsk }}>
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
