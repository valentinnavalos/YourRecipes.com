// import { ASCENDENTE } from "../../components/Order/constants/sort";
// import { LOWEST } from "../../components/Order/constants/sortByScore";
import { ASCENDENTE } from "../../components/order/constants/sort";
import { LOWEST } from "../../components/order/constants/sortByScore";
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
  // SEARCH_RECIPES_FAIL,
} from "../actions/actionTypes";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  recipeDetail: {},
  typesOfDiets: [],
  // errorMsg: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };
    }
    case SEARCH_RECIPES: {
      console.log("reducer , payload", action.payload);
      return {
        ...state,
        filteredRecipes: action.payload,
      };
    }
    // case SEARCH_RECIPES_FAIL: {
    //   console.log("reducer , payload", action.payload);
    //   return {
    //     ...state,
    //     errorMsg: action.payload,
    //   };
    // }
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
      // let filtered = state.recipes.filter((el) => {
      //   if (el.diets?.includes(action.payload)) {
      //     return el;
      //   }
      //   return null;
      // });
      let filtered = state.recipes.filter((el) => el.diets? el.diets.includes(action.payload)? el : null: null);
      return {
        ...state,
        filteredRecipes: filtered,
      };
    }
    case SORT: {
      let sorted = state.filteredRecipes.sort((a, b) => {
        if (a.title < b.title) return action.payload === ASCENDENTE ? -1 : 1;
        if (a.title > b.title) return action.payload === ASCENDENTE ? 1 : -1;
        //arriba, no evaluamos si action.payload === 'desc' porque ya lo
        //estamos haciendo con el ternario.

        //si quisiesemos hacerlo con un if else, podriamos hacerlo asi:
        // if (action.payload === 'asc') {
        //   if (a.name < b.name) return -1;
        //   if (a.name > b.name) return 1;
        // } else {
        //   if (a.name < b.name) return 1;
        //   if (a.name > b.name) return -1;
        // }
        return 0;
      });
      return {
        ...state,
        filteredRecipes: sorted,
      };
    }
    case SORT_BY_SCORE: {
      let sorted = state.filteredRecipes.sort((a,b) => {
        if (a.spoonacularScore < b.spoonacularScore) return action.payload === LOWEST ? -1 : 1;
        if (a.spoonacularScore > b.spoonacularScore) return action.payload === LOWEST ? 1 : -1;
        return 0;
      })
      return {
        ...state,
        filteredRecipes: sorted,
      }
    }
    default:
      return state;
  }
}
