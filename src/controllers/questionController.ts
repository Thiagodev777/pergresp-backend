import { Request, Response } from 'express'
import { Question } from '../models/Question'
import Helpers from '../helpers/helpers'

const questionController = {
  /* ===== ROUTER SEARCH ALL ====== */
  async findAll(req: Request, res: Response) {
    try {
      const questions = await Question.findAll({ raw: true })
      return res.status(200).json(questions)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ code: 500, msg: 'Internal Server Error' })
    }
  },

  /* ===== ROUTER SEARCH ONE ====== */
  async findOne(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    try {
      const question = await Question.findByPk(id)
      if (!question) {
        return res.status(404).json({ code: 404, msg: 'Not found' })
      }
      return res.status(200).json(question)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 'error', msg: 'Internal Server Error' })
    }
  },

  /* ===== ROUTER CREATE ====== */
  async createQuestion(req: Request, res: Response) {
    const { title, description, id_user } = req.body
    if (Helpers.verifyType(title, description, id_user)) {
      try {
        const questionCreate = await Question.create({
          title,
          description,
          id_user,
        })
        return res.status(200).json(questionCreate)
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ code: 'error', msg: 'Internal Server Error' })
      }
    } else {
      return res.status(400).json({
        code: 400,
        msg: 'name, description and user ID are required',
      })
    }
  },

  /* ===== ROUTER UPDATE ====== */
  async updateQuestion(req: Request, res: Response) {
    const id = req.params.id
    const { title, description } = req.body
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    if (title || description) {
      try {
        const question = await Question.findByPk(id)
        if (!question) {
          return res.status(404).json({ code: 404, msg: 'Not found' })
        }
        try {
          await Question.update(
            {
              title,
              description,
            },
            { where: { idquestion: id } },
          )
          return res.status(200).json({ idquestion: +id, title, description })
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
      return res
        .status(400)
        .json({ code: 400, msg: 'title or description is required' })
    }
  },

  /* ===== ROUTER DELETE ====== */
  async deleteQuestion(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    try {
      const question = await Question.findByPk(id)
      if (!question) {
        return res.status(404).json({ code: 404, msg: 'Not found' })
      }
      try {
        await Question.destroy({
          where: { idquestion: id },
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

export default questionController
