import { Router } from 'express'
import {
  create,
  listId,
  listall,
  remove,
  update,
  updateIdDone
} from './controllers/TaskManager'
import {
  checkout,
  getCityandState,
  getProducts
} from './controllers/Ecommerces'

const router = Router()

router.get('/manager-task', listall)
router.get('/manager-task/:id', listId)
router.post('/manager-task', create)
router.put('/manager-task/:id', update)
router.delete('/manager-task/:id', remove)
router.put('/manager-task/:id/done', updateIdDone)

router.post('/mini-ecommerces/checkout', checkout)
router.get('/mini-ecommerces/:slugCity/cidades', getCityandState)
router.get('/mini-ecommerces/products', getProducts)
export { router }
