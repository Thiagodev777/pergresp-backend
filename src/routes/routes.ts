import { Router } from 'express'
import questionController from '../controllers/questionController'
const router = Router()

router.get('/questions', questionController.findAll)
router.get('/question/:id', questionController.findOne)
router.post('/question', questionController.createQuestion)

router.put('/question/:id', (req, res) => {
  res.send('ok')
})

router.delete('/question/:id', (req, res) => {
  res.send('ok')
})

export default router
