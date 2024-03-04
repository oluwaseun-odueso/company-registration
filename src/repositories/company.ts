import { CompanyType } from "../interfaces/interfaces";
import { Company } from "../models/companyModel";

export default class CompanyRepository {
  async create(payload: CompanyType): Promise<Company> {
    try {
      const company = await Company.create(payload)
      return JSON.parse(JSON.stringify(company))
    } catch (error: any) {
      throw new Error(`Error saving company: ${error.message}`)
    }
  }

  async getCompany(id: string) {
    try {
      const company = await Company.findOne({ where: {id}})
      return company
    } catch (error: any) {
      throw new Error(`Error retrieving company: ${error.message}`)
    }
  }
}