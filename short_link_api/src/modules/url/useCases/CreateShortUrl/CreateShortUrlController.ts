import { Request, Response } from 'express'
import { CreateShotUrlUseCase } from './CreateShortUrlUseCase'

interface IRequest {
  link: string
  userId?: string
}

class CreateShotUrlController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request
    const { link }: IRequest = request.body
    let userId
    if (!!user) {
      userId = user.id ?? undefined
    }
    const createShortUrlUseCase = new CreateShotUrlUseCase()

    const urlShort = await createShortUrlUseCase.exec({
      url: link,
      userId,
    })

    return response.status(201).json(urlShort)
  }
}

export { CreateShotUrlController }