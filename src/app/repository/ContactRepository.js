const db = require("../../database/index.js")

class ContactRepository {
   async findAll(orderBy = 'ASC') {
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
        const rows = await db.query(`
            SELECT contacts.*, categories.name AS category_name
            FROM contacts
            LEFT JOIN categories ON categories.id = contacts.category_id
            ORDER BY contacts.name ${direction}
            `)
        return rows
    }

    async findById (id) {
        const [rows] = await db.query('SELECT * FROM contacts WHERE id = $1', [id])
        return rows
    }

    findByEmail (email) {
        return new Promise((resolve) => {
            const contact = contacts.find((contacts) => contacts.email === email)
            resolve(contact)
        })
    }

    create ({ name, phone, email, category_id }) {
        return new Promise((resolve) => {
            const createNewContact = {
                id: uuid(),
                name,
                phone,
                email,
                category_id: uuid(),
            }

            contacts.push(createNewContact)
            resolve(createNewContact)
        })
    }

    update (id, { name, phone, email, category_id}) {
        return new Promise((resolve) => {
            const updatedContact = {
                id: uuid(),
                name,
                phone,
                email,
                category_id,
            }

            contacts = contacts.map((contact) => contact.id === id ? updatedContact : contact)

            resolve(updatedContact)
        })
    }

    delete (id) {
        return new Promise((resolve) => {
            contacts = contacts.filter((contact) => contact.id !== id)
            resolve()
        })
    }
}

module.exports = new ContactRepository()
