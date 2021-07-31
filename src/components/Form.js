import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Form = () => {
  const { categorias } = useContext(CategoriasContext);
  const { searchRecipe, setAsk } = useContext(RecetasContext);

  const [search, setSearch] = useState({
    nombre: "",
    categoria: "",
  });

  // funcion para leer los contenidos

  const obtenerDatosReceta = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        searchRecipe(search);
        setAsk(true);
      }}
    >
      <fieldset className="text-center">
        <legend className="alert alert-danger text-white text-center">
          Busca bebidas por Categoria o Ingrediente
        </legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4 mt-2">
          <input
            className="form-control"
            name="nombre"
            type="text"
            placeholder="Buscar por Ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>
        <div className="col-md-4 mt-2">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatosReceta}
          >
            <option value=""> --Seleciona Categoria--</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mt-2">
          <input
            className="btn btn-block btn-danger"
            type="submit"
            value="Buscar Bebidas"
          ></input>
        </div>
      </div>
    </form>
  );
};

export default Form;
