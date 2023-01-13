import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database-mysql/mysql'
import { Answer } from './Answer'

export interface QuestionInstance extends Model {
  idquestion: number
  title: string
  description: string
}

export const Question = sequelize.define<QuestionInstance>(
  'Question',
  {
    idquestion: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'questions',
    timestamps: false,
  },
)
Question.hasMany(Answer)
Answer.belongsTo(Question)

Question.sync({ force: false })
