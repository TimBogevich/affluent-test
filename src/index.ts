import dotenv from "dotenv-flow"
dotenv.config()
// import {sequelize} from "./SequelizeConfig"
// sequelize.sync({force: true});
// import UserLoader from "./UsersLoader"
// let loader = new UserLoader()

import AffluentLoader from "./AffluentLoader"
let affLoader = new AffluentLoader()


const main = async () => {
  //await loader.getUsers()
  //await loader.saveUsers()

  await affLoader.getData()
}


main()
