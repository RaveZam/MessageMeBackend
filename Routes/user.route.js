const express = require("express");
const router = express.Router();

const { AddUser, Login } = require("../Controllers/user.controller");

router.post("/AddUser", AddUser);
router.post("/Login", Login);

module.exports = router;
