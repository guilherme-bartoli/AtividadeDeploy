import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../../models/user.entity'
import Token from '../../models/token.entity'

export default class AuthController {
    static async store (req: Request, res: Response){
        const {name,email,password} = req.body

        if(!name) return res.status(400).json({error: "Nome obrigatório"})
        if(!email) return res.status(400).json({error: "Email obrigatório"})
        if(!password) return res.status(400).json({error: "Senha obrigatório"})

        const user = new User()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password,10)
        await user.save()

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    }

    static async login (req: Request, res: Response){
        const {email, password} = req.body

        if (!email || !password) return res.status(400).json({error: "Email e senha são obrigatórios"})

        const user = await User.findOneBy({email})
        if (!user) return res.status(401).json({ error: 'Usuário não encontrado' })

        const passwCheck = bcrypt.compareSync(password, user.password)
        if (!passwCheck) return res.status(401).json({ error: 'Senha inválida' })

        await Token.delete({user: {id: user.id}})

        const token = new Token()
        const stringRand = user.id + new Date().getTime().toString()
        token.token = bcrypt.hashSync(stringRand,1).slice(-30)
        token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
        token.refreshToken = bcrypt.hashSync(2+stringRand,1).slice(-30)
        token.user = user
        await token.save()

        return res.json({
            token: token.token,
            expiresAt: token.expiresAt,
            refreshToken: token.refreshToken
        })
    }
}