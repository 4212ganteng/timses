const express = require("express");
const masyarakat = require("../controllers/masyarakat");
const router = express.Router();
const auth = require("../midlleware/auth");
// create
router.post("/create", auth, masyarakat.create);
// get by profile
router.get("/getbyprofile", auth, masyarakat.findByProfile);

module.exports = router;
