import axios from "axios"
import User from "./User"

export default class UserLoader {

  url: string = process.env.AFF_USERS_URL || ""

  async getUsers() {
    let total_pages = 1
    for (let page = 1; page <= total_pages; page++) {
      let res = await axios.get(this.url, { params: { page } })
      total_pages = res.data.total_pages
      this.parseRes(res.data.data)
    }
  }



  parseRes(data: any) {
    return data.map((i: User) => {
      return User.create(i)
    })
  }


}


