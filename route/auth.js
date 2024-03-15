var express = require('express');
const { login, register } = require('../controller/authController');

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

module.exports = authRouter;