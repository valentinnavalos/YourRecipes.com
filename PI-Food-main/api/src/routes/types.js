const { Router } = require("express");
const { Type } = require("./../db");
const router = Router();

router.get("/", async (req, res, next) => {
  // Obtener todos los tipos de dietas posibles.
  // En una primera instancia, cuando no exista ninguno,
  //deberán precargar la base de datos con los tipos de
  //datos indicados por spoonacular en el link del readme.

  try {
    let dietas;
    let dietsNames = [
      "Gluten Free",
      "Ketogenic",
      "Vegetarian",
      "Lacto-Vegetarian",
      "Ovo-Vegetarian",
      "Vegan",
      "Pescetarian",
      "Paleo",
      "Primal",
      "Low FODMAP",
    ];

    dietas = await Type.findAll();

    if (dietas.length) res.json(dietas);
    else {
      dietsNames.map(async (d) => {
        await Type.create({name: d})
      })
      res.json(dietas)
    }
  } catch (error) {
    next(error);
  }

  // return Type.findAll().then((tip) => res.send(tip));
  // res.send("Soy get /types");
});

// router.post("/", (req, res, next) => {
//   res.send("Soy post /types");
// });

// router.put("/", (req, res, next) => {
//   res.send("Soy put /types");
// });

// router.delete("/", (req, res, next) => {
//   res.send("Soy delete /types");
// });

module.exports = router;
