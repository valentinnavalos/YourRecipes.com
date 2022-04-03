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
        //estamos pisando el [] recipes original del initialState.
      };
    }
    default:
      return state;
  }
}
