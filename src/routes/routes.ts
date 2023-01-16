import { Router } from 'express'
import questionController from '../controllers/questionController'
const router = Router()

// ROUTES QUESTIONS
router.get('/questions', questionController.findAll)
router.get('/question/:id', questionController.findOne)
router.post('/question', questionController.createQuestion)
router.put('/question/:id', questionController.updateQuestion)
router.delete('/question/:id', questionController.deleteQuestion)

export default router
