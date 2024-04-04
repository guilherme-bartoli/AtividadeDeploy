import { Router } from 'express'
import taskRoutes from './task/task.routes'
import authRoutes from './auth/auth.routes'
import notesRoutes from './dependant/dependant.routes'

const routes = Router()

routes.use('/task',taskRoutes)
routes.use('/auth',authRoutes)
routes.use('/kinship',notesRoutes)

export default routes

//npm i yarn --global
//npx yarn add cors @types/cors -D
//bcrypt -> 
//npx yarn add bcrypt
//npx yarn add bcrypt @types/bcrypt -D