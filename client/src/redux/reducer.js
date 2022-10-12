import {
  GET_RECIPES,
  SEARCH_RECIPES,
  RECIPES_DETAILS,
  GET_DIETS,
  CREATE_RECIPE,
  ORDER_ALF,
  ORDER_SCORE,
  FILTER_DB,
  FILTER_DIET,
} from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state, //devuelve una copia del estado
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    case RECIPES_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
      };

    case ORDER_ALF:
      let alfOrder =
        action.payload === "asc_name"
          ? state.recipes.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: alfOrder,
      };

    case ORDER_SCORE:
      let scoreOrder =
        action.payload === "asc_score"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: scoreOrder,
      };

    

    case FILTER_DIET:
      const recipesAll = state.allRecipes;
      const dietsFiltered =
        action.payload === "All"
          ? recipesAll
          : recipesAll.filter((el) => el.diets?.includes(action.payload));
      if (dietsFiltered.length === 0) {
        alert(`No recipes found for ${action.payload} diet`);
        return state;
      } else {
        return {
          ...state,
          recipes: dietsFiltered,
        };
      }

      case FILTER_DB:
      const createdFilter =
        action.payload === "Created"
          ? state.allRecipes.filter((e) => e.createdInDb)
          : state.allRecipes.filter((e) => !e.createdInDb );

      return {
        ...state,
        recipes: createdFilter,
      }

    default:
      return state;
  }
}
