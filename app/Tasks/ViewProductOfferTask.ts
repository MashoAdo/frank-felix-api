import ProductOffer from "App/Models/ProductOffer";
import { TaskInterface } from "App/Types/Interfaces";

export default class ViewProductOfferTask implements TaskInterface {
  public async run(product_offer_id: number) {
    const product_offer = ProductOffer.query()
      .where("id", product_offer_id)
      .first();

    return product_offer;
  }
}
