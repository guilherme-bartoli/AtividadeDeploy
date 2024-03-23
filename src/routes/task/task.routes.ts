import { Router } from 'express'
import TaskController from '../../controllers/task/task.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const taskRoutes = Router()

taskRoutes.post('/', TaskController.store)
taskRoutes.get('/', authMiddleware,  TaskController.index)
taskRoutes.get('/:id', TaskController.show)
taskRoutes.delete('/:id', TaskController.delete)
taskRoutes.put('/:id', TaskController.update)

export default taskRoutes