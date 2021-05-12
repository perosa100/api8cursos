import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { hash } from 'bcryptjs'

const createUser = async (request: Request, response: Response) => {
  const userRepository = getCustomRepository(UserRepository)

  const { name, username, password } = request.body

  const existUser = await userRepository.findOne({ username })

  if (existUser) {
    return response.status(400).json({ message: 'Usuário ja Existe' })
  }

  const passwordHash = await hash(password, 8)

  const user = userRepository.create({
    name,
    username,
    password: passwordHash
  })

  await userRepository.save(user)

  delete user.password

  return response.status(201).json(user)
}

const showUser = async (request: Request, response: Response) => {
  const userRepository = getCustomRepository(UserRepository)

  const users = await userRepository.find()

  return response.status(201).json(users)
}

export { createUser, showUser }
