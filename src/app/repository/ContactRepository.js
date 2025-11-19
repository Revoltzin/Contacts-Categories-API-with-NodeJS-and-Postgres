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

   async findByEmail (email) {
        const row = await db.query('SELECT * FROM contacts WHERE email = $1', [email])
        return row
    }

    async create ({ name, phone, email, category_id }) {
        const [row] = await db.query(`INSERT INTO contacts(name, phone, email, category_id)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `, [name, phone, email, category_id])
        
        return row
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

    async delete (id) {
        const deletOp = await db.query('DELETE FROM contacts WHERE id = $1', [id])
        return deletOp
    }
}

module.exports = new ContactRepository()
