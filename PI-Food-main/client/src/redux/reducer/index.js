import {
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAR_DETAIL,
  POST_NEW_RECIPE,
} from "../actions/actionTypes";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  recipeDetail: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case SEARCH_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case GET_RECIPE_DETAIL: {
      return {
        ...state,
        recipeDetail: action.payload,
      };
    }
    case CLEAR_DETAIL: {
      return {
        ...state,
        recipeDetail: {},
      };
    }
    case POST_NEW_RECIPE: {
      return {
        ...state,
        recipeDetail: action.payload,
      };
    }
    default:
      return state;
  }
}
