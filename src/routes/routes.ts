import { Router, Response, Request } from 'express'
import { sequelize } from '../config/database-mysql/mysql'

const router = Router()

try {
  sequelize.authenticate().then(() => console.log('connect with success'))
} catch (err) {
  console.log(err)
}

router.get('/', async (req: Request, res: Response) => {
  res.json({ msg: 'ok' })
})

export default router
