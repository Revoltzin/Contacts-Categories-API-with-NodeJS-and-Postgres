const { Router } = require("express")

const ContactController = require("./app/controller/ContactController.js")

const router = Router

router.get("/contacts", ContactController.index)

module.exports = router