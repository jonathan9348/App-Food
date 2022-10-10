import { GET_RECIPES, SEARCH_RECIPES } from "./actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    details: []
}

export default function rootReducer(state = initialState, action){

    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload

            }

            case SEARCH_RECIPES:
                return{
                    ...state,
                    recipes: action.payload
                }

            default:
                return state;
    }

}