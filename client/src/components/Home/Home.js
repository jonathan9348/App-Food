import React, { useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Search/SearchBar";
import Card from "../Card/Card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDb,
  filterDiet,
  getDiets,
  getRecipes,
  orderAlf,
  orderScore,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import '../Home/Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const recipes = useSelector((state) => state.recipes);
  //----------PAGINADO---------------//
  const [actualPage, setActualPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);
  const last = actualPage * recipesPage; // 1 * 9 = 9
  const first = last - recipesPage; // 9 - 9 = 0
  const result = recipes.slice(first, last); // (0,9)
  //---------ORDEN------------------//
  const [order, setOrder] = useState("");
  const [orderHealth, setOrderHealth] = useState("");

  const setPagination = (page) => {
    return setActualPage(page);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterDiets(e) {
    e.preventDefault();
    dispatch(filterDiet(e.target.value));
  }

  function handleFilterPost(e) {
    dispatch(filterDb(e.target.value));
    setOrder(e.target.value);
  }

  function handleSortAlf(e) {
    e.preventDefault();
    dispatch(orderAlf(e.target.value));
    setOrder(`Order ${e.target.value}`);
  }

  function handleSortScore(e) {
    e.preventDefault();
    dispatch(orderScore(e.target.value));
    setOrderHealth(`Order ${e.target.value}`);
  }

  return (
    <div className="cont1">
      <div className="cont2">
        <div>
          <button className="btn-1" onClick={(e) => {handleClick(e)}}>
            Load Recipes
          </button>
        </div>

        <div>
          <Link to="/create">
            <button className="btn-1">Create Recipe</button>
          </Link>
        </div>

        <div className="search">
          <SearchBar />
        </div>
        {/*--------------FILTRADO Y ORDEN---------------*/}
        <div className="filter">
          <div>
            <div>Filter by Diet</div>
            <select className="sbFilter" onChange={(e) => {handleFilterDiets(e)}}>
              <option value="All" default>All Diets</option>
              {diets.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div>Filter by name</div>
            <select className="sbFilter" onChange={(e) => {handleSortAlf(e)}}>
              <option value="All" default>All Diets</option>
              <option value="asc_name">Sort(A-Z)</option>
              <option value="des_name">Sort(Z-A)</option>
            </select>
          </div>

          <div>
            <div>Filter by Health Score</div>
            <select className="sbFilter" onChange={(e) => {handleSortScore(e)}}>
              <option value="All" default>All healthScore</option>
              <option value="asc_score">Sort(min-max)</option>
              <option value="des_score">Sort(max-min)</option>
            </select>
          </div>

          <div>
            <div>Filter by Created/Existing</div>
            <select className="sbFilter" onChange={(e) => {handleFilterPost(e)}}>
              <option value="All" default>All Recipes</option>
              <option value="Api">Recipes in API</option>
              <option value="Created">Recipes in DB</option>
            </select>
          </div>
        </div>
      </div>

      <h1 className="title">What are you going to cook today?</h1>

      <div className="layout">
        {result?.map((e) => {
          return (
            <div key={e.id}>
              <Link to={"/home/" + e.id}>
                <Card
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  diets={e.diets.map(e => e.name + ' | ')}
                  healthScore={e.healthScore}
                />
              </Link>
            </div>
          );
        })}
        ;
      </div>

      <div>
        {
          <Pagination
            recipesPage={recipesPage}
            allRecipes={recipes.length}
            setPagination={setPagination}
            actualPage={actualPage}
            className="cont4"
          />
        }
      </div>
    </div>
  );
}
