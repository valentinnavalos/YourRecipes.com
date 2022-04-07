const { default: axios } = require("axios");
const {
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAR_DETAIL,
  POST_NEW_RECIPE,
} = require("./actionTypes");
require("dotenv").config();

// const { HOST, PORT } = process.env;

function getRecipes() {
  return async function (dispatch) {
    try {
      const aux = "";
      let response = await axios.get(
        `http://localhost:3001/api/recipes?name=${aux}`
        // 'http://localhost:3001/api/recipes/all'
      );
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
      return dispatch({
        type: SEARCH_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
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
  return async function (dispatch) {
    try {
      let response = await axios.post(
        "http://localhost:3001/api/recipes",
        recipe
      );
      return dispatch({
        type: POST_NEW_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = {
  getRecipes,
  searchRecipes,
  getRecipeDetail,
  clearDetail,
  postNewRecipe,
};
