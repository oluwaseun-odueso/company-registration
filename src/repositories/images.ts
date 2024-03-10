import { Image } from "../models/imagesModel";
import { ImageType } from "../types/types";

export default class ImageRepository {
  async saveImage (payload: ImageType): Promise<Image> {
    try {
      const image = await Image.create(payload)
      return JSON.parse(JSON.stringify(image))    
    } catch (error: any) {
      throw new Error(`Error saving image: ${error.message}`)
    }
  }
}