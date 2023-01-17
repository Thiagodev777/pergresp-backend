import { Request, Response } from 'express'
import Helpers from '../helpers/helpers'
import { User } from '../models/User'

const userController = {
  async findAll(req: Request, res: Response) {
    try {
      const users = await User.findAll({ raw: true })
      return res.status(200).json(users)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ code: 500, msg: 'Internal Server Error' })
    }
  },

  async findOne(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    try {
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({ code: 404, msg: 'Not found' })
      }
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 'error', msg: 'Internal Server Error' })
    }
  },

  async createUser(req: Request, res: Response) {
    const { name, age, sex, city, email, password } = req.body
    if (Helpers.verifyTypeUser(name, age, sex, city, email, password)) {
      try {
        const emailDuplicate = await User.findOne({ where: { email: email } })
        if (emailDuplicate) {
          return res.status(400).json({
            code: 400,
            msg: 'email already exists',
          })
        }
        const userCreate = await User.create({
          name,
          age,
          sex,
          city,
          email,
          password,
        })
        return res.status(200).json(userCreate)
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ code: 'error', msg: 'Internal Server Error' })
      }
    } else {
      return res.status(400).json({
        code: 400,
        msg: 'name, age, gender, city, email and password are required',
      })
    }
  },

  async updateUser(req: Request, res: Response) {
    const id = req.params.id
    const { name, age, sex, city, email, password } = req.body
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    if (name || age || sex || city || email || password) {
      try {
        const user = await User.findByPk(id)
        if (!user) {
          return res.status(404).json({ code: 404, msg: 'Not found' })
        }
        try {
          const emailDuplicate = await User.findOne({ where: { email: email } })
          if (emailDuplicate) {
            return res.status(400).json({
              code: 400,
              msg: 'email already exists',
            })
          }
          await User.update(
            {
              name,
              age,
              sex,
              city,
              email,
              password,
            },
            { where: { iduser: id } },
          )
          return res
            .status(200)
            .json({ isuser: +id, name, age, sex, city, email, password })
        } catch (error) {
          console.log(error)
          return res
            .status(500)
            .json({ code: 'error', msg: 'Internal Server Error' })
        }
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ code: 'error', msg: 'Internal Server Error' })
      }
    } else {
      return res.status(400).json({
        code: 400,
        msg: 'name or age or gender or city, email or password are required',
      })
    }
  },

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    try {
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({ code: 404, msg: 'Not found' })
      }
      try {
        await User.destroy({
          where: { iduser: id },
        })
        return res.status(200).json({ code: 200, msg: 'successfully deleted' })
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ code: 'error', msg: 'Internal Server Error' })
      }
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 'error', msg: 'Internal Server Error' })
    }
  },
}

export default userController
