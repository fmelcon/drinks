import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 370,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(1, 1, 0),
  },
}));

const Recipe = ({ recipe }) => {
  // Configuracion del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Extraer los valores del context

  const { setIdReceta, setReceta, receta } = useContext(ModalContext);

  // Mostrar ingredientes

  const mostrarIngredientes = (receta) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h5 className="card-header text-white text-center">
          {recipe.strDrink}
        </h5>

        <div className="bg-light tarjeta">
          <LazyLoadImage
            className="card-img-top tarjeta__img"
            src={recipe.strDrinkThumb}
            effect="blur"
            alt={`Imagen de ${recipe.strDrink}`}
          />
        </div>
        <div className="card-body">
          <button
            onClick={() => {
              setIdReceta(recipe.idDrink);
              handleOpen();
            }}
            type="button"
            className="btn btn-block btn-danger"
          >
            Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              setReceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h4 className="text-center bg-light">{receta.strDrink}</h4>
              <h5 className="mt-4 text-danger">Instrucciones</h5>
              <p className="text-muted">{receta.strInstructions}</p>
              <img
                className="card-img-top my-4"
                src={receta.strDrinkThumb}
                alt={receta.strDrink}
              />
              <h5 className="mt-4 text-danger">Ingredientes y Cantidades</h5>
              <ul className="text-muted">{mostrarIngredientes(receta)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
