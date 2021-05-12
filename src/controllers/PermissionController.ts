import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { PermissionRepository } from '../repositories/PermissionRepository'

const createPermission = async (request: Request, response: Response) => {
  const persmissionRepository = getCustomRepository(PermissionRepository)

  const { name, description } = request.body

  const existPermission = await persmissionRepository.findOne({ name })

  if (existPermission) {
    return response.status(400).json({ message: 'Permissão ja Existe' })
  }

  const permission = persmissionRepository.create({
    name,
    description
  })

  await persmissionRepository.save(permission)

  return response.status(201).json(permission)
}

const showPermission = async (request: Request, response: Response) => {
  const persmissionRepository = getCustomRepository(PermissionRepository)

  const permission = await persmissionRepository.find()

  return response.status(201).json(permission)
}

export { createPermission, showPermission }
