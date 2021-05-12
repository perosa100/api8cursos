import { Router } from 'express'

import { createUser, showUser } from './controllers/UserController'
import { createSession } from './controllers/SessionController'
import {
  createPermission,
  showPermission
} from './controllers/PermissionController'

const router = Router()

router.post('/users', createUser)
router.get('/users', showUser)

router.get('/sessions', createSession)

router.post('/permissions', createPermission)
router.get('/permissions', showPermission)

export { router }
