function validateForm(state, steps) {
  //tenemos que devolver un objeto de errores.
  const errors = {};
  if (!state.title) {
    errors.title = "Title is required";
  // } else if (!/^[\d]$/.test(state.title)) {
  //   errors.title = "Title must be a string";
  } else if (!/^[a-zñ|A-ZÑ\s\u00E0\u00FC]{6,}$/.test(state.title)) {
    errors.title = "Title must be a string of at least 6 characters long";
  } else {
    errors.title = "";
  }
  // if (!state.image) {
  //   errors.image = "Image is required";
  // } else if (
  //   !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(state.image)
  // ) {
  //   errors.image = "Image must be a valid URL";
  // }
  if (!state.summary) {
    errors.summary = "Summary is required";
  } else if (!/^[a-zñ|A-ZÑ\s\d]{10,}$/.test(state.summary)) {
    errors.summary = "Summary must be at least 10 characters long";
  } else {
    errors.summary = "";
  }
  if (!state.spoonacularScore) {
    errors.spoonacularScore = "Spoonacular score is required";
  } else if (!/[^0-100]/.test(state.spoonacularScore)) {
    errors.spoonacularScore = "Spoonacular score must be between 0 and 100";
  } else {
    errors.spoonacularScore = "";
  }
  if (!state.healthScore) {
    errors.healthScore = "Health score is required";
  } else if (!/[^0-100]/.test(state.healthScore)) {
    errors.healthScore = "Health score must be between 0 and 100";
  } else {
    errors.healthScore = "";
  }
  if (!state.diets) {
    errors.diets = "Diets is required";
  } else if (!/\w/.test(state.diets)) {
    errors.diets = "Diets must be at least one";
  } else {
    errors.diets = "";
  }
  if (steps && !steps.length) {
    errors.steps = "Steps must be at least one";
  } else {
    errors.steps = "";
  }
  return errors;
}

module.exports = {
  validateForm,
};
