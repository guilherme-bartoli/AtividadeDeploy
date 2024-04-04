import { Request, Response } from 'express'
import Task from '../../models/task.entity'

export default class TaskController {
    static async store(req: Request, res: Response){
        const {title, completed} = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        if(!title){
            return res.status(400).json({erro: 'Título é obrigatório!'})
        }

        const task = new Task()
        task.title = title
        task.completed = completed ?? false
        task.userId = Number(userId)
        await task.save()

        return res.status(201).json(task)
    }

    static async index(req: Request, res: Response){
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const tasks = await Task.find({where: { userId: Number(userId) }})
        return res.status(200).json(tasks)
    }

    static async show(req: Request, res: Response){
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const task = await Task.findOneBy({id: Number(id), userId: Number(userId)})

        if(!task) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        return res.json(task)

    }

    static async delete(req: Request, res: Response){
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const task = await Task.findOneBy({id: Number(id), userId: Number(userId)})

        if(!task) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        await task.remove()
        return res.status(204).send()
    }

    static async update(req: Request, res: Response){

        const { id } = req.params
        const { title, completed } = req.body
        const { userId } = req.headers

        if(!title){
            return res.status(400).json({ error: 'O título é obrigatório' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if(completed === undefined){
            return res.status(400).json({ error: 'O completado é obrigatório' })
        }
        //
        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        const task = await Task.findOneBy({id: Number(id),  userId: Number(userId)})

        if(!task) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        //task.title = title || task.title // caso title for nulo na requisição (PUT), mantem o titulo original
        task.title = title
        task.completed = completed
        await task.save()

        return res.json(task)
    }
}