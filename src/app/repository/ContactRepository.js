const { uuid } = require("uuidv4")

let contacts = [
    {
        id: uuid(),
        name: "Matheus",
        phone: "424124",
        email: "matheus@mail.com",
        category_id: uuid(),
    },
    {
        id: uuid(),
        name: "Carlos",
        phone: "934843",
        email: "carlos@email.com",
        category_id: uuid(),    
    },
]

class ContactRepository {
    findAll() {
        return new Promise((resolve) => {
            resolve(contacts)
        })
    }

    findById (id) {
        return new Promise((resolve) => {
            const contact = contacts.find((contacts) => contacts.id === id)
            resolve(contact)
        })
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
}

module.exports = new ContactRepository()
