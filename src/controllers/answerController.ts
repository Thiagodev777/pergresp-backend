import { Request, Response } from 'express'
import { Answer } from '../models/Answer'

const answerController = {
  /* ===== ROUTER SEARCH ALL ====== */
  async findAll(req: Request, res: Response) {
    try {
      const answers = await Answer.findAll({ raw: true })
      return res.status(200).json(answers)
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
      const answer = await Answer.findByPk(id)
      if (!answer) {
        return res.status(404).json({ code: 404, msg: 'Not found' })
      }
      return res.status(200).json(answer)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 'error', msg: 'Internal Server Error' })
    }
  },

  /* ===== ROUTER CREATE ====== */
  async createAnswer(req: Request, res: Response) {
    const { body, id_user, id_question } = req.body
    if (body && id_user && id_question) {
      try {
        const answerCreate = await Answer.create({
          body,
          id_user,
          id_question,
        })
        return res.status(200).json(answerCreate)
      } catch (error) {
        console.log(error)
        return res
          .status(500)
          .json({ code: 'error', msg: 'Internal Server Error' })
      }
    } else {
      return res.status(400).json({
        code: 400,
        msg: 'The answer, respondent user id and question id are required',
      })
    }
  },

  async updateAnswer(req: Request, res: Response) {
    const id = req.params.id
    const { body } = req.body
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    if (body) {
      try {
        const answer = await Answer.findByPk(id)
        if (!answer) {
          return res.status(404).json({ code: 404, msg: 'Not found' })
        }
        try {
          await Answer.update(
            {
              body,
            },
            { where: { idanswer: id } },
          )
          return res.status(200).json({ idanswer: +id, body })
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
      return res.status(400).json({ code: 400, msg: 'The answer is mandatory' })
    }
  },

  /* ===== ROUTER DELETE ====== */
  async deleteAnswer(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(+id)) {
      return res.status(400).json({ code: 400, msg: 'Invalid data' })
    }
    try {
      const answer = await Answer.findByPk(id)
      if (!answer) {
        return res.status(404).json({ code: 404, msg: 'Not found' })
      }
      try {
        await Answer.destroy({
          where: { idanswer: id },
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

export default answerController
