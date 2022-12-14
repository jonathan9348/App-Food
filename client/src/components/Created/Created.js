import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipe, getDiets } from "../../redux/actions";
import { Link } from "react-router-dom";
import validation from "../validation";
import '../Created/created.css'

export default function Created() {
  const dispatch = useDispatch();
  const history = useHistory();

  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});

  const [recipe, setRecipe] = useState({
    name: "",
    summary: "",
    image: "",
    instructions: "",
    healthScore: 0,
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function changeInput(e) {
    setRecipe((recipe) => {
      const newRecipe = {
        ...recipe,
        [e.target.name]: e.target.value,
      };

      const errors = validation(newRecipe);
      setErrors(errors);
      return newRecipe;
    });
  }

  function handleSelect(e) {
    if (recipe.diets.includes(e.target.value)) {
      alert("This type of diet already exists");
    } else {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    setRecipe({
      ...recipe,
      diets: recipe.diets.filter((d) => d !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(createRecipe(recipe));
    e.target.reset();
    alert("Recipe created successfully!");

    setRecipe({
      name: "",
      summary: "",
      image: "",
      instructions: "",
      healthScore: 0,
      diets: [],
    });

    history.push("/home"); //histoy:navego en mi historial y el push agrego el nombre la ruta a donde se ubicara
  }

  const checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] !== "") return false;
    }
    return true;
  };

  return (
    <div className="title">
      <h1 className="title-post">Create Recipe!</h1>

      <form className="form-name" noValidate onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <div >
              <div>
                <label className="tit">-Name-</label>
                <input
                  
                  className="label-input"
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={(e) => changeInput(e)}
                />
                {errors.name ? (<p className="errors">{errors.name}</p>) : null}
              </div>
              <div >
              <label className="tit">-Description-</label>
                <input
                  
                  className="label-input"
                  type="text"
                  name="summary"
                  value={recipe.summary}
                  onChange={(e) => changeInput(e)}
                />
                {errors.summary ? (<p className="errors">{errors.summary}</p>) : null}
                    
                    
                </div>
              <div>
                <label className="tit">-Instructions-</label>
                <input
                  className="label-input"
                  type="text"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={(e) => changeInput(e)}
                />
              </div>
              <div>
                <label className="tit">-Health Score-</label>
                <input
                  className="label-input"
                  type="number"
                  name="healthScore"
                  value={recipe.healthScore}
                  onChange={(e) => changeInput(e)}
                />
                {errors.healthScore ? (
                  <p className="errors">{errors.healthScore}</p>
                ) : null}
              </div>
            </div>
            <div>
              <label className="tit">-Image-</label>
              <input
                className="label-input"
                type="text"
                name="image"
                value={recipe.image}
                onChange={(e) => changeInput(e)}
              />
            </div>
          </div>
          <div className="check">
            <label className="tit">-Diets-</label>
            <div className="dietdiv">
              <select className="label-input" onChange={(e) => handleSelect(e)}>
                {diets.map((d) => (
                  <option value={d.name} key={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <ul>
                <li>{recipe.diets.map((e) => e + ", ")}</li>
              </ul>
            </div>
          </div>

          {!Object.keys(errors).length && !checkProperties(recipe) ? (
            <button type="submit" className="btn-post">
              <span>Create</span>
            </button>
          ) : (
            <button disabled type="submit" className="btn-post">
              <span>Create</span>
            </button>
          )}
        </div>
      </form>
      <Link to="/home">
        <button className="btn-back">Volver</button>
      </Link>
    </div>
  );
}
