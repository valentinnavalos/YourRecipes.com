const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
  res.send("Soy get /types");
});

router.post("/", (req, res, next) => {
  res.send("Soy post /types");
});

router.put("/", (req, res, next) => {
  res.send("Soy put /types");
});

router.delete("/", (req, res, next) => {
  res.send("Soy delete /types");
});

module.exports = router;
