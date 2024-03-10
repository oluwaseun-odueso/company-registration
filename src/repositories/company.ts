import { CompanyType, ImageType } from "../types/types";
import { Company } from "../models/companyModel";

export default class CompanyRepository {
  async register(payload: CompanyType): Promise<Company> {
    try {
      const company = await Company.create(payload)
      return JSON.parse(JSON.stringify(company))
    } catch (error: any) {
      throw new Error(`Error saving company: ${error.message}`)
    }
  }

  async getCompany(id: string) {
    try {
      const company = await Company.findOne({ where: { id }})
      return company
    } catch (error: any) {
      throw new Error(`Error retrieving company: ${error.message}`)
    }
  }

  async getRecentInputs() {
    try {
      const recentInputs = await Company.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
      });
      return recentInputs
    } catch (error: any) {
      throw new Error(`Error fetching recent inputs: ${error.message}`)
    }
  }

  async userHasARegisteredCompany (userId: string) {
    try {
      const company = await Company.findOne({ where: { userId }})
      return company
    } catch (error: any) {
      throw new Error(`Error checking if user has a registered company: ${error.message}`)
    }
  }
}