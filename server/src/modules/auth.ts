import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const compareUserPasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashUserPassword = password => {
    return bcrypt.hash(password, 5)
}

export const createJWT = user => {
    const token = jwt.sign({
        id: user.id,
        user_login: user.user_login
    }, process.env.JWT_SECRET)
    console.log(token);
    return token
}

export const protect = (req, res, next) => {
    // console.log(req);
    
    const bearer = req.headers.authorization
    if(!bearer){
        res.status(401)
        res.json({ message: 'not authorized' })
        return
    }
    const [, token] = bearer.split(' ')
    if(!token){
        res.status(401)
        res.json({ message: '_not valid token' })
        return
    } 
    try {        
        const user = jwt.verify(token, process.env.JWT_SECRET)
        console.log(user);
        
        req.user = user
        next()
    } catch(e){
        console.log(token);
        
        res.status(401)
        res.json({ message: 'not valid token__' })
        return
    }
}