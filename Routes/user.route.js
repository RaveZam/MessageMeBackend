const express = require("express");
const router = express.Router();

const { AddUser, Login, getUsers } = require("../Controllers/user.controller");

router.post("/AddUser", AddUser);
router.post("/Login", Login);
router.get("/getUsers", getUsers);

module.exports = router;
