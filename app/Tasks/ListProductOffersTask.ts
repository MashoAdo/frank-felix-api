import ProductOffer from "App/Models/ProductOffer";
import { TaskInterface } from "App/Types/Interfaces";

export default class ListProductOffersTask implements TaskInterface {
  public async run() {
    return await ProductOffer.query().orderBy("created_at", "asc");
  }
}
