import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { CreateShotUrlController } from '../modules/url/useCases/CreateShortUrl/CreateShortUrlController'
import { DeleteLinkController } from '../modules/url/useCases/DeleteLink/DeleteLinkController'
import { GetMyUrlsController } from '../modules/url/useCases/GetMyUrls/GetMyUrlsController'
import { GetUrlsController } from '../modules/url/useCases/GetUrls/GetUrlsController'

const shortUrlRoutes = Router()

shortUrlRoutes.delete(
  '/',
  ensureAuthenticated,
  new DeleteLinkController().handle
)
shortUrlRoutes.get('/paginate', new GetUrlsController().handle)
shortUrlRoutes.get('/me', ensureAuthenticated, new GetMyUrlsController().handle)
shortUrlRoutes.post(
  '/shorten',
  verifyAuthenticated,
  new CreateShotUrlController().handle
)

export { shortUrlRoutes }
