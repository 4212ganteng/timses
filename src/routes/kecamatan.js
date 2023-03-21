const express = require("express");
const kecamatan = require("../controllers/kecamatan");
const router = express.Router();

router.post("/", kecamatan.create);
// findall
router.get("/findall", kecamatan.findAll);

module.exports = router;
