import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import route from './routes/index.js'

dotenv.config()
const app = express()

const port = process.env.PORT || 5000

app.use(express.static('public'))
app.use('/api',route)

app.use(cors())
app.use(express.static('public'))
app.listen(port,()=>console.log(`listening ${port}`))







