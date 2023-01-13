import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database-mysql/mysql'

export interface AnswerInstance extends Model {
  idanswer: number
  body: string
}

export const Answer = sequelize.define<AnswerInstance>(
  'Answer',
  {
    idanswer: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'answers',
    timestamps: false,
  },
)

Answer.sync({ force: false })
