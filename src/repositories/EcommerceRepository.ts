import { EntityRepository, Repository } from 'typeorm'
import { Ecommerce } from '../models/Ecommerce'

@EntityRepository(Ecommerce)
class EcommerceRepository extends Repository<Ecommerce> {}

export { EcommerceRepository }
