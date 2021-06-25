import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUserSendComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListUserController } from './controllers/ListUsersController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserSendComplimentsController'
import { auth } from './middlewares/auth'
import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()

const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()

const listTagsController = new ListTagsController()

const listUsersController = new ListUserController()

router.post("/users", createUserController.handle)
router.post("/tags", auth, ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", auth, createComplimentController.handle)

router.get("/users/compliments/send", auth, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", auth, listUserReceiveComplimentsController.handle)

router.get("/tags", listTagsController.handle)

router.get("/users", auth, listUsersController.handle)

export { router }