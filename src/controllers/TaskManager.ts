import { Request, Response } from 'express'
import { getCustomRepository, Like } from 'typeorm'
import { TaskRepository } from '../repositories/TaskRepository'
import { validate } from 'uuid'
class TaskManager {
  async listall(request: Request, response: Response) {
    const page = Number(request.query['page']) || Number(1)
    const ordem: any = request.query['ordem']
    const filter = request.query['filter']
    const itens = Number(request.query['itens']) || Number(2)

    const tasksRepository = getCustomRepository(TaskRepository)
    console.log('page', page)
    console.log('ordem', ordem[1])
    console.log('filter', filter[1])
    console.log('itens', itens)

    let listAllPage

    if (!ordem[1] && !filter[1]) {
      console.log('nao tem ordem e nao filtro')
      listAllPage = await tasksRepository.find({
        skip: page,
        take: itens
      })
    } else if (!ordem[1] && !filter[1]) {
      console.log('nao tem ordem e nao filtro')
      listAllPage = await tasksRepository.find({
        skip: page,
        take: itens
      })
    } else if (ordem[1] && !filter[1]) {
      console.log('tem ordem e nao filtro')
      listAllPage = await tasksRepository.find({
        skip: page,
        take: itens,
        order: { name: ordem[1] }
      })
    } else if (!ordem[1] && !filter[1]) {
      console.log('nao tem ordem e nao filtro')
      listAllPage = await tasksRepository.find({
        skip: page,
        take: itens
      })
    } else if (ordem[1] && filter[1]) {
      console.log('nao tem tem ordem e filtro')
      listAllPage = await tasksRepository.find({
        skip: page,
        take: itens,
        where: { name: Like('%' + filter[1] + '%') }
      })
    } else {
      console.log(' tem ordem e  filtro')
      listAllPage = await tasksRepository.find({
        skip: page,
        take: itens,
        order: { name: ordem[1] },
        where: { name: Like('%' + filter[1] + '%') }
      })
    }
    return response
      .status(201)
      .json({ tasks: listAllPage, totalPages: listAllPage.length })
  }

  async listId(request: Request, response: Response) {
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
  async create(request: Request, response: Response) {
    const { name } = request.body

    const taskRepository = getCustomRepository(TaskRepository)

    const task = taskRepository.create({
      name
    })

    await taskRepository.save(task)

    return response.status(201).json(task)
  }
  async update(request: Request, response: Response) {
    const { name, done } = request.body

    if (!name || !done) {
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
  async delete(request: Request, response: Response) {
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
  async updateIdDone(request: Request, response: Response) {
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
}

export { TaskManager }
