const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
  res.send("Soy get /recipe");
});

router.post("/", (req, res, next) => {
  res.send("Soy post /recipe");
});

router.put("/", (req, res, next) => {
  res.send("Soy put /recipe");
});

router.delete("/", (req, res, next) => {
  res.send("Soy delete /recipe");
});

module.exports = router;
