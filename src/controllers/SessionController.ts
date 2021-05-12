import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const createSession = async (request: Request, response: Response) => {
  const userRepository = getCustomRepository(UserRepository)

  const { name, username, password } = request.body

  const user = await userRepository.findOne({ username })

  if (!user) {
    return response.status(400).json({ message: 'Usuário não encontrado' })
  }

  const matchPassword = await compare(password, user.password)

  if (!matchPassword) {
    return response.status(400).json({ message: 'Usuario ou senha invalida' })
  }

  const token = sign({}, process.env.JWT_SECRET, {
    subject: user.id,
    expiresIn: '1d'
  })

  return response.json({ user, token })
}

export { createSession }
