import { AccountType } from "../interfaces/interfaces";
import { UserA } from "../models/userAModel";


export default class UserAAccountRepository {
  constructor(
  ){}

  async create(payload: AccountType): Promise<UserA> {
    try {
      const user = await UserA.create(payload)
      return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`)
    }
  }

  async findOne(email: string): Promise<UserA | null> {
    try {
      const user = await UserA.findOne({ where: {email}})
      return user 
    } catch (error: any) {
      throw new Error(`Error retrieving user: ${error.message}`)
    }
  }
}