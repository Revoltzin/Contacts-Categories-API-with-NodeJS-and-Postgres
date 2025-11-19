const CategoriesRepository = require("../repository/CategoryRepository.js")

class CategoryController {
    async index (req, res) {
        const categories = await CategoriesRepository.findAll()
        res.json(categories)
    }

    async store (req, res) {
        const { name } = req.body

        if (!name) {
            return res.status(404).json({ error: "Name is required" })
        }

        const category = await CategoriesRepository.create({ name })

        res.json(category)
    }
}

module.exports = new CategoryController()