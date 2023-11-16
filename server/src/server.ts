import express from 'express'
import cors from 'cors'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, login } from './handlers/user'
import prisma from './db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('dev'))

// app.use((req, res, next) => {
//     req.app_message = 'произошел запрос на сервер'
//     next()
// })

// app.get('/', (req, res) => {
//     res.send(JSON.stringify({ app_message: req.app_message }))
// })

app.use('/api', protect, router)

app.get('/', async (req, res) => {
    const users = await prisma.users.findMany()
    res.json({ users })
})
app.post('/registration', createNewUser)
app.post('/login', login)

export default app