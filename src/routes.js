const { Router } = require("express")

const ContactController = require("./app/controller/ContactController.js")

const router = Router()

router.get("/contacts", ContactController.index)
router.get("/contacts/:id", ContactController.show)
router.post("/contacts", ContactController.store)
router.put("/contacts/:id", ContactController.update)

module.exports = router