const { Router } = require("express");
const { findOrCreateTypesOfDiets } = require("../controllers/types");

const router = Router();

router.get("/", findOrCreateTypesOfDiets);

module.exports = router;
