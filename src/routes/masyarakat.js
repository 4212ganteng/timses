const express = require("express");
const masyarakat = require("../controllers/masyarakat");
const router = express.Router();
const auth = require("../midlleware/auth");
// create
router.post("/create", auth, masyarakat.create);
// get by profile
router.get("/getbyprofile", auth, masyarakat.findByProfile);
// get all
router.get("/", masyarakat.findAll);
// update
router.patch("/:id", auth, masyarakat.update);
// delete
router.delete("/:id", auth, masyarakat.delete);

module.exports = router;
