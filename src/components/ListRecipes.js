import React, { useContext } from "react";
import { RecetasContext } from "../context/RecetasContext";
import Recipe from "./Recipe";

const ListRecipes = () => {
  // Extraer las recetas
  const { recipe } = useContext(RecetasContext);

  return (
    <div className="row mt-5">
      {recipe.map((recipe) => (
        <Recipe key={recipe.idDrink} recipe={recipe} />
      ))}
    </div>
  );
};

export default ListRecipes;
