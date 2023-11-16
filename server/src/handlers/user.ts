import prisma from "../db"
import { compareUserPasswords, createJWT, hashUserPassword } from "../modules/auth"

export const createNewUser = async (req, res) => {
    console.log('reg');
    
    const values = req.body.values
    const hashedUserPassword = await hashUserPassword(values.user_password)
    const user = await prisma.users.create({
        data: {
            user_login: values.user_login,
            user_password: hashedUserPassword,
            user_firstname: values.user_firstname,
            user_lastname: values.user_lastname
        }
    })
    console.log(user);

    const token = createJWT(user)
    // console.log(token);
    // const message = `USER ${values.user_login}-${hashedUserPassword}-${values.user_firstname}-${values.user_lastname} WAS REGISTERED`
    console.log(`USER ${values.user_login}-${hashedUserPassword}-${values.user_firstname}-${values.user_lastname} WAS REGISTERED`);
    
    res.json({ token })    
}

export const login = async (req, res) => {
    console.log('login');
    
    const values = req.body.values
    const user = await prisma.users.findUnique({
        where: {
            user_login: values.user_login
        }
    })
    const isValid = await compareUserPasswords(values.user_password, user.user_password)
    if(!isValid){
        res.status(401)
        res.json({ message: 'not signed in' })
        return
    }
    console.log(user);
    
    const token = createJWT(user)
    // console.log(token);
    // const message = `USER ${(await user).user_login}-${(await user).user_password}-${(await user).user_firstname}-${(await user).user_lastname} WAS SIGNED IN`
    console.log(`USER ${user.user_login}-${user.user_password}-${user.user_firstname}-${user.user_lastname} WAS SIGNED IN`);
    // req.data = user
    res.json({ token })
}