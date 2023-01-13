import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database-mysql/mysql'
import { Answer } from './Answer'
import { Question } from './Question'

export interface UserInstance extends Model {
  iduser: number
  name: string
  age: string
  sex: string
  city: string
  email: string
  password: string
}

export const User = sequelize.define<UserInstance>(
  'User',
  {
    iduser: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
    },
    city: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
)

User.hasMany(Question)
Question.belongsTo(User)

User.hasMany(Answer)
Answer.belongsTo(User)

User.sync({ force: false })
