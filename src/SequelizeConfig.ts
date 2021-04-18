import { Sequelize }  from 'sequelize-typescript'
import User from "./User"

const sequelize = new Sequelize({
  host: process.env.DWH_HOST!,
  database: process.env.DWH_DB_NAME!,
  dialect: 'mysql',
  username: process.env.DWH_USER!,
  password: process.env.DWH_PASSWORD!,
  models: [User]
})



export {sequelize}