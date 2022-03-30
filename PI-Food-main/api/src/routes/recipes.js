const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
  res.send("Soy get /recipes");
});

router.post("/", (req, res, next) => {
  res.send("Soy post /recipes");
});

router.put("/", (req, res, next) => {
  res.send("Soy put /recipes");
});

router.delete("/", (req, res, next) => {
  res.send("Soy delete /recipes");
});

module.exports = router;
