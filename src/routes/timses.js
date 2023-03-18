const express = require("express");
const timses = require("../controllers/timses");
const router = express.Router();

router.post("/register", timses.register);
router.post("/login", timses.login);
router.get("/cekauth", timses.cekAuth);

module.exports = router;
