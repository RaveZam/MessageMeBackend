const express = require("express");
const router = express.Router();

const { AddUser } = require("../Controllers/user.controller");

router.post("/AddUser", AddUser);

module.exports = router;
