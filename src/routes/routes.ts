import { Router, Response, Request } from 'express'
import { sequelize } from '../config/database-mysql/mysql'

const router = Router()

try {
  sequelize.authenticate().then(() => console.log('connect with success'))
} catch (err) {
  console.log(err)
}

router.get('/', (req: Request, res: Response) => {
  res.send('ok')
})

export default router
