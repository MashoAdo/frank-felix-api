import ProductOffer from "App/Models/ProductOffer";
import { TaskInterface } from "App/Types/Interfaces";

export default class DeleteProductOfferTask implements TaskInterface {
  public async run(product_offer_id: number) {
    await ProductOffer.query().where("id", product_offer_id).delete();

    return;
  }
}
