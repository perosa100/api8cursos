import { Request, Response } from 'express'
import { getCustomRepository, ILike } from 'typeorm'
import { TaskRepository } from '../repositories/TaskRepository'
import { validate } from 'uuid'

const listall = async (request: Request, response: Response) => {
  let page = Number(request.query.page) || 1
  let ordem: any = request.query.ordem || undefined
  let filter = request.query.filter || undefined
  let itens = Number(request.query.itens) || 3

  const tasksRepository = getCustomRepository(TaskRepository)

  console.log('page', page)
  console.log('ordem', ordem)
  console.log('filter', filter)
  console.log('itens', itens)

  if (ordem && filter) {
    console.log('ordem e filter existe')
    page = 1
    var [result, count] = await tasksRepository.findAndCount({
      where: { name: ILike(`%${filter}%`) },
      take: itens,
      skip: itens * (page - 1),
      order: { name: ordem },
      cache: true
    })
  } else if (filter) {
    console.log('filter  existe')
    page = 1
    var [result, count] = await tasksRepository.findAndCount({
      where: { name: ILike(`%${filter}%`) },
      take: itens,
      skip: itens * (page - 1),
      cache: true
    })
  } else if (ordem) {
    console.log('ordem existe')
    page = 1
    var [result, count] = await tasksRepository.findAndCount({
      take: itens,
      skip: itens * (page - 1),
      order: { name: ordem },
      cache: true
    })
  } else {
    console.log('ordem nao existe nem filter')
    var [result, count] = await tasksRepository.findAndCount({
      take: itens,
      skip: itens * (page - 1),
      cache: true
    })
  }

  return response.status(201).json({ tasks: result, totalPages: count, page })
}

const listId = async (request: Request, response: Response) => {
  const id = request.params.id

  const idValidation = validate(id)
  if (!idValidation) {
    return response.status(400).json({
      erro: 'ID de Inesistente '
    })
  }

  const tasksRepository = getCustomRepository(TaskRepository)

  const taksID = await tasksRepository.findOne({ id })

  if (!taksID) {
    return response.status(400).json({
      erro: 'Tarefa não Existe'
    })
  }

  return response.status(201).json(taksID)
}
const create = async (request: Request, response: Response) => {
  const { name } = request.body

  const taskRepository = getCustomRepository(TaskRepository)

  const task = taskRepository.create({
    name
  })

  await taskRepository.save(task)

  return response.status(201).json(task)
}
const update = async (request: Request, response: Response) => {
  const { name, done } = request.body
  console.log(name, done)

  if (!name) {
    return response.status(400).json({
      erro: 'Requisição inválida'
    })
  }
  const id = request.params.id

  const tasksRepository = getCustomRepository(TaskRepository)

  let findTask = await tasksRepository.findOne(id)

  if (!findTask) {
    return response.status(400).json({
      erro: 'Tarefa invalida'
    })
  }

  findTask.name = name
  findTask.done = done

  const updateLog = await tasksRepository.save(findTask)

  return response.status(201).json(updateLog)
}

const remove = async (request: Request, response: Response) => {
  const id = request.params.id

  const tasksRepository = getCustomRepository(TaskRepository)

  let findTask = await tasksRepository.findOne(id)

  if (!findTask) {
    return response.status(400).json({
      erro: 'Tarefa invalida'
    })
  }

  await tasksRepository.remove(findTask)

  return response.status(201).json('Tarefa Deletada')
}
const updateIdDone = async (request: Request, response: Response) => {
  const id = request.params.id

  const tasksRepository = getCustomRepository(TaskRepository)

  let findTask = await tasksRepository.findOne(id)

  if (!findTask) {
    return response.status(400).json({
      erro: 'Tarefa invalida'
    })
  }

  findTask.done = true

  const updateLog = await tasksRepository.save(findTask)

  return response.status(201).json(updateLog)
}

export { listId, listall, create, update, updateIdDone, remove }
