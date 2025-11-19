const express = require("express")

const routes = require("./routes.js")

const app = express()

app.use(express.json())
app.use(routes)
app.use((error, req, res, next) => {
    console.log(error)
    res.sendStatus(500)
})

app.listen(3000, () => {
    console.log("Serer is running")
})