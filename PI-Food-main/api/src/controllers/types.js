const { Type } = require("../db");

const traeOEncuentraDietas = async (req, res, next) => {
  try {
    //PSEUDOCODIGO.
    //esta ruta se va a ejecutar cuando querramos traer (GET) los tipos de dietas
    //PERO, si a priori no hay nada hay que precargar con todas los tipos de dietas.

    //APROXIMACIÓN.
    //deberiamos usar un findOrCreated() para que en caso de que no existan las dietas
    //(primer caso) las cree, y para que en caso de que existan... las findee (encuentre)
    //para ser devueltas como un find() normal.

    const dietsNames = [
      //en diets: []
      "Gluten Free", //
      "Ketogenic",
      "Vegetarian", //
      "Lacto-Vegetarian",
      "Ovo-Vegetarian",
      "Vegan", //
      "Pescetarian",
      "Paleo",
      "Primal",
      "Low FODMAP",
    ];

    let result = dietsNames.filter(async (d) => {
      const [type, created] = await Type.findOrCreate({
        where: {
          name: d,
        },
        defaults: {
          name: d,
        },
      });
      console.log(created);
      return type;
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  traeOEncuentraDietas,
};
