import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mainRoutes from './routes/routes'

dotenv.config()
const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.use(mainRoutes)

server.use((req, res) => {
  res.status(404).json({ msg: 'not found' })
})
server.listen(process.env.PORT)
