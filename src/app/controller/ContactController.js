const ContactRepository = require("../repository/ContactRepository.js")

class ContactController {
    async index(req, res) {
        const contact = await ContactRepository.findAll()
        res.json(contact)
    }

    async show(req, res) {
        const { id } = req.params

        const contact = await ContactRepository.findById(id)

        if (!contact) {
            return res.status(404).json({ error: "User not foud" })
        }

        res.json(contact)
    }

    store() {}

    update() {}

    delete () {}
}

module.exports = new ContactController()