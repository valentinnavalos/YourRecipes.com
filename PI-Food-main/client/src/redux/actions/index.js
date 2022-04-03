import axios from "axios";
import { GET_RECIPES } from "./actionTypes";

export function fetchRecipes(){
return function(dispatch){
    axios.get('http://localhost:3001/api/recipes/')
    .then(response => {
        dispatch({
            //este dispatch es para disparar la acción
            type: GET_RECIPES,
            payload: response.data
        })
    })
}
}