import { GET_RECIPES } from "../actions/actionTypes";

const initialState = {
  recipes: [],
  filteredRecipes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
        //con el payload que viene del action, estamos pisando el [] recipes
        //guardando en el store, el array de recipes traido del backend.
      };
    }
    case "SEARCH_RECIPES": {
      return {
        ...state,
        recipes: action.payload,
      }
    }
    default:
      return state;
  }
}
