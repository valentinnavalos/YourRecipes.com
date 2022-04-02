const { Router } = require("express");
const { traeOEncuentraDietas } = require("../controllers/types");

const router = Router();

router.get("/", traeOEncuentraDietas);

module.exports = router;
