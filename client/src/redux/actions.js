import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const RECIPES_DETAILS = "RECIPES_DETAILS";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const ORDER_ALF = "ORDER_ALF";
export const ORDER_SCORE = "ORDER_SCORE";
export const FILTER_DB = "FILTER_DB";
export const FILTER_DIET = "FILTER_DIET";

export function getRecipes() {
  return async (dispatch) => {
    const { data } = await axios.get("http://localhost:3001/recipes");

    return dispatch({
      type: GET_RECIPES,
      payload: data,
    });
  };
}

export function searchRecipes(name) {
  return async (dispatch) => {
    try {
      const recipeName = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: SEARCH_RECIPES,
        payload: recipeName.data,
      });
    } catch (err) {
      alert("No se encontró un nombre");
    }
  };
}

export function recipesDetails(id) {
  return async (dispatch) => {
    const recId = await axios.get(`http://localhost:3001/recipes/${id}`);

    return dispatch({
      type: RECIPES_DETAILS,
      payload: recId.data,
    });
  };
}

export function getDiets() {
  return async (dispatch) => {
    const diets = await axios.get("http://localhost:3001/diets");

    return dispatch({
      type: GET_DIETS,
      payload: diets.data,
    });
  };
}

export function createRecipe(payload) {
  return async () => {
    const createdRecipes = await axios.post("http://localhost:3001/recipes", payload);
    return createdRecipes;
  };
}

export function orderAlf(order) {
  return {
    type: ORDER_ALF,
    payload: order,
  };
}

export function orderScore(order) {
  return {
    type: ORDER_SCORE,
    payload: order,
  };
}

export function filterDb(type) {
  return {
    type: FILTER_DB,
    payload: type,
  };
}

export function filterDiet(type) {
  return {
    type: FILTER_DIET,
    payload: type,
  };
}
