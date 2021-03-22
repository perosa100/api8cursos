import { Request, Response } from 'express'
import { getCustomRepository, ILike } from 'typeorm'
import { EcommerceRepository } from '../repositories/EcommerceRepository'
import cityAndState from '../../cidades-estados.json'
import products from '../../products.json'

const checkout = (request: Request, response: Response) => {
  const ecommerceRepository = getCustomRepository(EcommerceRepository)

  return response.status(201).json({ Nome: 'Na' })
}

const getCityandState = (request: Request, response: Response) => {
  const slugCity = request.params.slugCity.toUpperCase()
  const dataStates = cityAndState.estados.filter(
    (state) => state.sigla === slugCity
  )

  if (dataStates.length === 0) {
    return response
      .status(404)
      .json({ error: `${slugCity} não é um estado valido` })
  }

  return response.json(dataStates[0].cidades)

  const ecommerceRepository = getCustomRepository(EcommerceRepository)
}
const getProducts = (request: Request, response: Response) => {
  return response.json(products)
}

export { checkout, getCityandState, getProducts }
