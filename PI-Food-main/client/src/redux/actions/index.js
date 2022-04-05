const { default: axios } = require("axios");
const { GET_RECIPES, SEARCH_RECIPES } = require("./actionTypes");
require("dotenv").config();

// const { HOST, PORT } = process.env;

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
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/api/recipes?name=${name}`)
      .then((response) => {
        dispatch({
          type: SEARCH_RECIPES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

module.exports = {
  // getRecipes,
  searchRecipes,
};
