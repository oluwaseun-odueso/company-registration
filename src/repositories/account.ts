import { AccountType } from "../interfaces/interfaces";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt'
require('dotenv').config()


export default class AccountRepository {
  constructor(
    private readonly saltRounds = process.env.SALT_ROUNDS as string
  ){}

  async create(payload: AccountType): Promise<User> {
    try {
      const user = await User.create(payload)
      return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`)
    }
  }

  async findOne(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: {email}})
      return user 
    } catch (error: any) {
      throw new Error(`Error retrieving user: ${error.message}`)
    }
  }

  async hashPassword (password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, this.saltRounds);
      return hash
    } catch (error: any) {
      throw new Error(`Error hashing password: ${error.message}`)
    }
  }

  async retrievePassword (email: string) {
    try {
      const data = await User.findOne({
        attributes: ["hashed_password"],
        where: {email}
      })
      return JSON.parse(JSON.stringify(data)).hashed_password;
    } catch (error: any) {
      throw new Error(`Error retrieving hashed password: ${error.message}`)
    }
  }

  async compareHashedPasswordWithUserInput (hashedPassword: string, enteredPassword: string) {
    try {
      const confirmPassword = await bcrypt.compare(enteredPassword, hashedPassword)
      return confirmPassword;
    } catch (error: any) {
      throw new Error(`Error comparing passwords: ${error.message}`)
    }
  }
}