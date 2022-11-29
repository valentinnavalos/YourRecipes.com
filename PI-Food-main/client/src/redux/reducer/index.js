import { ASCENDENTE } from "../../components/Order/constants/sort";
import { LOWEST } from "../../components/Order/constants/sortByScore";
import {
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAR_DETAIL,
  POST_NEW_RECIPE,
  GET_TYPES_OF_DIETS,
  FILTER_BY_TYPE_OF_DIET,
  SORT,
  SORT_BY_SCORE,
  FILTER_BY_CREATION,
  UPDATE_RECIPE_FROM_DB,
  DELETE_RECIPE_FROM_DB,
} from "../actions/actionTypes";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  recipeDetail: {},
  typesOfDiets: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_BY_CREATION: {
      let arrayFiltered = [];
      if (action.payload === "db") {
        arrayFiltered = state.recipes?.filter((el) => el.createdInDb);
      } else {
        arrayFiltered = state.recipes?.filter((el) => !el.createdInDb);
      }

      return {
        ...state,
        filteredRecipes: arrayFiltered,
      };
    }
    case GET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };
    }
    case SEARCH_RECIPES: {
      return {
        ...state,
        filteredRecipes: action.payload,
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
    case GET_TYPES_OF_DIETS: {
      return {
        ...state,
        typesOfDiets: action.payload,
      };
    }
    case FILTER_BY_TYPE_OF_DIET: {
      let filtered = state.recipes.filter((el) =>
        el.diets.length ? (el.diets.includes(action.payload) ? el : null) : null
      );
      return {
        ...state,
        filteredRecipes: filtered,
      };
    }
    case SORT: {
      let sorted = state.filteredRecipes.sort((a, b) => {
        if (a.title < b.title) return action.payload === ASCENDENTE ? -1 : 1;
        if (a.title > b.title) return action.payload === ASCENDENTE ? 1 : -1;

        return 0;
      });
      return {
        ...state,
        filteredRecipes: sorted,
      };
    }
    case SORT_BY_SCORE: {
      let sorted = state.filteredRecipes.sort((a, b) => {
        if (a.spoonacularScore < b.spoonacularScore)
          return action.payload === LOWEST ? -1 : 1;
        if (a.spoonacularScore > b.spoonacularScore)
          return action.payload === LOWEST ? 1 : -1;
        return 0;
      });
      return {
        ...state,
        filteredRecipes: sorted,
      };
    }
    case UPDATE_RECIPE_FROM_DB: {
      return {
        ...state,
      };
    }
    case DELETE_RECIPE_FROM_DB: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
