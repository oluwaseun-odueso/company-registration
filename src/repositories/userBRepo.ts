import { AccountType } from "../types/types";
import { UserB } from "../models/userBModel";


export default class UserBAccountRepository {
  constructor(
  ){}

  async create(payload: AccountType): Promise<UserB> {
    try {
      const user = await UserB.create(payload)
      return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`)
    }
  }

  async findOne(email: string): Promise<UserB | null> {
    try {
      const user = await UserB.findOne({ where: {email}})
      return user 
    } catch (error: any) {
      throw new Error(`Error retrieving user: ${error.message}`)
    }
  }
}