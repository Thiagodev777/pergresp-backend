import { Router } from 'express'
import answerController from '../controllers/answerController'
import questionController from '../controllers/questionController'
import userController from '../controllers/userController'
const router = Router()

// ROUTES QUESTIONS
router.get('/questions', questionController.findAll)
router.get('/question/:id', questionController.findOne)
router.post('/question', questionController.createQuestion)
router.put('/question/:id', questionController.updateQuestion)
router.delete('/question/:id', questionController.deleteQuestion)

// ROUTES USERS
router.get('/users', userController.findAll)
router.get('/user/:id', userController.findOne)
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

// ROUTES ANSWERS
router.get('/answers', answerController.findAll)
router.get('/answer/:id', answerController.findOne)
router.post('/answer', answerController.createAnswer)
router.put('/answer/:id', answerController.updateAnswer)
router.delete('/answer/:id', answerController.deleteAnswer)

export default router
