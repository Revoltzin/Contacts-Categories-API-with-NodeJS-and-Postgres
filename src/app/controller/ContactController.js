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

    async store(req, res) {
        const { name, phone, email, category_id } = req.body

        if (!name) {
            return res.status(400).json({ error: "Name is required" })
        }

        const contactExists = await ContactRepository.findByEmail(email)

        if (contactExists) {
            return res.status(400).json({ error: "This email is already been taken" })
        }

        const contact = await ContactRepository.create({
            name,
            phone, 
            email,
            category_id
        })

        res.json(contact)
    }

    async update(req, res) {
        const { id } = req.params
        const { name, phone, email, category_id } = req.body

        const contactExists = await ContactRepository.findById()

        if (!contactExists) {
        return res.status(404).json({ error: "User not found"})
        }

        if (!name) {
            return res.status(404).json({ error: "Name is required" })
        }

        const contactByEmail = await ContactRepository.findByEmail(email)

        if (contactByEmail && contactByEmail.id !== id) {
            return res.status(404).json({ error: "This email is already in use" })
        }

        const contact = await ContactRepository.update(id, {
            name,
            phone,
            email,
            category_id,
        })

        res.json(contact)
    }

    delete () {}
}

module.exports = new ContactController()