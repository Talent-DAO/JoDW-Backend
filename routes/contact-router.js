const express = require("express");

const ContactController = require("../controllers/contact-controller");

const router = express.Router();

router.post("/contact", ContactController.createContact);

module.exports = router;
