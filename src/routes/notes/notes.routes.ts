import { Router } from 'express'
import NotesController from '../../controllers/notes/notes.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const notesRoutes = Router()

notesRoutes.post('/', authMiddleware, NotesController.store)
notesRoutes.get('/', authMiddleware, NotesController.index)
notesRoutes.get('/:id', authMiddleware, NotesController.show)
notesRoutes.delete('/:id', authMiddleware, NotesController.delete)
notesRoutes.put('/:id', authMiddleware, NotesController.update)

export default notesRoutes