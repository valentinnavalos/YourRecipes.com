const { default: axios } = require("axios");
const {
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAR_DETAIL,
  POST_NEW_RECIPE,
  GET_TYPES_OF_DIETS,
  FILTER_BY_TYPE_OF_DIET,
  SORT,
  SORT_BY_SCORE,
  // SEARCH_RECIPES_FAIL
} = require("./actionTypes");
// require("dotenv").config();

// const { HOST, PORT } = process.env;

function getRecipes() {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        // `http://localhost:3001/api/recipes?name=${aux}`
        "http://localhost:3001/api/recipes/all"
      );
      console.log("getRecipes", response);
      return dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// function getRecipes() {
//   return function (dispatch) {
//     axios
//       // .get(`http://${HOST}:${PORT}/api/recipes/all`)
//       .get("http://localhost:3001/api/recipes/all")
//       .then((response) => {
//         dispatch({
//           //este dispatch es para disparar la acción
//           type: GET_RECIPES,
//           payload: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }

function searchRecipes(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/api/recipes?name=${name}`
      );
      console.log("searchRecipes", response.data);

      return dispatch({
        type: SEARCH_RECIPES,
        payload: response.data,
      });

    } catch (error) {
      console.log(error);
      return dispatch({
        type: SEARCH_RECIPES,
        payload: [],

        // type: SEARCH_RECIPES_FAIL,
        // payload: 'Recipes not found',

        // payload: 'Recipes not found',
        // payload: response.data,//--> no lee el response
      });
    }
  };
}

// function searchRecipes(name) {
//   return function (dispatch) {
//     axios
//       .get(`http://localhost:3001/api/recipes?name=${name}`)
//       .then((response) => {
//         dispatch({
//           type: SEARCH_RECIPES,
//           payload: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }

function getRecipeDetail(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/api/recipes/${id}`);

      console.log(response.data);
      return dispatch({
        type: GET_RECIPE_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function clearDetail() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAR_DETAIL,
    });
  };
}

function postNewRecipe(recipe) {
  // recipe = {
  //   diets: [],
  //   healthScore: "",
  //   image:
  //     "https://th.bing.com/th/id/R.792a9ac420562b7778339e65d53f81c4?rik=2%2bRWj%2bFfa%2bGFow&pid=ImgRaw&r=0",
  //   spoonacularScore: "",
  //   steps: [],
  //   summary: "Deliciosa pizza.",
  //   title: "Pizza mozzarella",
  //   };

  return async function (dispatch) {
    try {
      console.log(recipe);
      let response = await axios.post(
        "http://localhost:3001/api/recipe",
        recipe
      );
      console.log(response);
      return dispatch({
        type: POST_NEW_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function getTypesOfDiets() {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:3001/api/types");
      return dispatch({
        type: GET_TYPES_OF_DIETS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function filterByTypesOfDiets(type) {
  return async function (dispatch) {
    return dispatch({
      type: FILTER_BY_TYPE_OF_DIET,
      payload: type,
    });
  };
}

function sortRecipes(order) {
  return {
    type: SORT,
    payload: order,
  };
}

function sortRecipesByScore(order) {
  return {
    type: SORT_BY_SCORE,
    payload: order,
  };
}

module.exports = {
  getRecipes,
  searchRecipes,
  getRecipeDetail,
  clearDetail,
  postNewRecipe,
  getTypesOfDiets,
  filterByTypesOfDiets,
  sortRecipes,
  sortRecipesByScore,
};
