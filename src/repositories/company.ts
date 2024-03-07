import { CompanyType, ImageType } from "../interfaces/interfaces";
import { Company } from "../models/companyModel";
import { Images } from "../models/imagesModel";

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

  async addImage(propertyImageDetails: ImageType): Promise<ImageType> {
    try {
        const imageDetails = await Images.create(propertyImageDetails)
        return JSON.parse(JSON.stringify(imageDetails))
    } catch (error: any) {
        throw new Error(`Error adding image: ${error}`)
    };
};
}