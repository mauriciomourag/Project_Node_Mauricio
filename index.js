const express  = require('express')
const app = express()

const infosRoutes = require('./routes/infosRoutes')
const animalsRoutes = require('./routes/animalsRoutes.js')

const host = '127.0.0.1'
const port = 4002

app.use(express.json())
app.use('/infos',infosRoutes)
app.use('/animals',animalsRoutes)

app.listen(port, host,()=>{
    console.log(`Server running at http://${host}:${port}`)
})