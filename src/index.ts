import dotenv from "dotenv-flow"
dotenv.config()
import {sequelize} from "./SequelizeConfig"

import UserLoader from "./UsersLoader"
let loader = new UserLoader()

import AffluentLoader from "./AffluentLoader"
let affLoader = new AffluentLoader() 


const main = async () => {
  // Create tables with definintions
  await sequelize.sync({force: true});

  // loading data from API
  await loader.getUsers()
    .catch(error => console.log("API", error))

  //Loading data from Affluent site
  await affLoader.getDates("10/01/2020", "10/30/2020")
    .catch(error => console.log("AFFLUENT", error))
}


main()
