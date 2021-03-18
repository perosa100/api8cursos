import { Router } from 'express'
import { TaskManager } from './controllers/TaskManager'

const taskManager = new TaskManager()
const router = Router()

router.get('/manager-task', taskManager.listall)
router.get('/manager-task/:id', taskManager.listId)
router.post('/manager-task', taskManager.create)
router.put('/manager-task/:id', taskManager.update)
router.delete('/manager-task/:id', taskManager.delete)
router.put('/manager-task/:id/done', taskManager.updateIdDone)

export { router }
