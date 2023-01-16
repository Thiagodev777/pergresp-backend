import { Request, Response } from 'express'
import { Question } from '../models/Question'

export interface Question {
  idquestion?: number
  title: string
  description: string
}

const questionController = {
  async findAll(req: Request, res: Response) {
    try {
      const questions = await Question.findAll({ raw: true })
      return res.status(200).json(questions)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 'error', msg: 'Internal Server Error' })
    }
  },

  async findOne(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(+id)) {
      return res.status(400).json({ code: '400', msg: 'Invalid data' })
    }
    try {
      const question = await Question.findByPk(id)
      if (!question) {
        return res.status(404).json({ code: '404', msg: 'Not found' })
      }
      return res.status(200).json(question)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ code: 'error', msg: 'Internal Server Error' })
    }
  },

  async createQuestion(req: Request, res: Response) {
    // falta rever o model de perguntas porque ta dando erro na hora de definir o id do usuario pois a chave estrangeira esta definida incorretamente (ID USUARIO)
  },

  async updateQuestion(req: Request, res: Response) {
    res.send('Atualizar Pergunta')
  },

  async deleteQuestion(req: Request, res: Response) {
    res.send('Deletar Pergunta')
  },
}

export default questionController
