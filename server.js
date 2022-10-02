const express = require('express')

const app = express()

const HOST = '127.0.0.1'

const PORT = process.env.PORT || 3000

app.use(express.static('./public'))

app.listen(PORT, HOST, () => {
    console.log(`Server connected at http://${HOST}:${PORT}`)
})