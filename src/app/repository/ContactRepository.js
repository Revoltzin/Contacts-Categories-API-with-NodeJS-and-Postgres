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
}

module.exports = new ContactRepository()
