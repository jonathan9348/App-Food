import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';

export function getRecipes(){
    return async(dispatch) =>{

        const {data} = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: GET_RECIPES,
            payload: data,
        })
    }
};

export function searchRecipes(name){
    return async(dispatch)=>{
        try{
        const recipeName = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        return dispatch({
            type: SEARCH_RECIPES,
            payload: recipeName.data
        })

    }catch(err){
        alert('No se encontró un nombre')

    }}
}