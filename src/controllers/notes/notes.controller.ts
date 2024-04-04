import { Request, Response } from 'express'
import Notes from '../../models/notes.entity'

export default class NotesController {
    static async store(req: Request, res: Response){
        const {name, kinship} = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        if(!name){
            return res.status(400).json({erro: 'Nome é obrigatório!'})
        }

        const notes = new Notes()
        notes.name = name
        notes.kinship = kinship ?? false
        notes.userId = Number(userId)
        await notes.save()

        return res.status(201).json(notes)
    }

    static async index(req: Request, res: Response){
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const notes = await Notes.find({where: { userId: Number(userId) }})
        return res.status(200).json(notes)
    }

    static async show(req: Request, res: Response){
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const notes = await Notes.findOneBy({id: Number(id), userId: Number(userId)})

        if(!notes) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        return res.json(notes)

    }

    static async delete(req: Request, res: Response){
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const notes = await Notes.findOneBy({id: Number(id), userId: Number(userId)})

        if(!notes) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        await notes.remove()
        return res.status(204).send()
    }

    static async update(req: Request, res: Response){

        const { id } = req.params
        const { name, kinship } = req.body
        const { userId } = req.headers

        if(!name){
            return res.status(400).json({ error: 'O nome é obrigatório' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if(kinship === undefined){
            return res.status(400).json({ error: 'O parentesco é obrigatório' })
        }
        //
        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        const notes = await Notes.findOneBy({id: Number(id),  userId: Number(userId)})

        if(!notes) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        //dependant.name = name || dependant.name // caso name for nulo na requisição (PUT), mantem o titulo original
        notes.name = name
        notes.kinship = kinship
        await notes.save()

        return res.json(notes)
    }
}