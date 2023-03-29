const express = require("express");
const sendEmailController = require("../controllers/email.controllers");

const route = express.Router();

route.post("/sendNewsletter", sendEmailController);

module.exports = route;
