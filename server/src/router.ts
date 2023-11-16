import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import prisma from './db'

// import { createNewUser, signin } from './handlers/user'

const router = Router()

// router.post('/registration', (req, res) => {
//     const { login, password, password2, Fname, Lname } = req.body.values
//     const newUserID = `user---${login}-${password}-${password2}-${Fname}-${Lname}-${new Date().getTime()}---registered`
//     // res.send(JSON.stringify({ newUserID }))
//     res.json({ newUserID })
// })
// router.post('/login', (req, res) => {
//     const { login, password } = req.body.values
//     const newUserID = `user---${login}-${password}-${new Date().getTime()}---logged in`
//     res.send(JSON.stringify({ newUserID }))
// })

// router.get('/getAllUsers', (_, res) => {
//     const allUsers = prisma.users.findMany({})
//     res.json({ allUsers })
// })
router.put('/update', async (req, res) => {
    const { user_firstname, user_lastname } = req.body.values
    // res.json({ message: req.user })
    console.log(req.params, req.params?.id);

    console.log('update user:', req.user);
    const currentUser = await prisma.users.findUnique({
        where: {
            id: req.user.id
        }
    })
    console.log(user_firstname, user_lastname);

    const updatedUser = { ...currentUser, user_firstname, user_lastname }
    
    const update = await prisma.users.update({
        where: {
          id: req.user.id
        },
        data: updatedUser
      })

    res.json({ updatedUser })
})




export default router