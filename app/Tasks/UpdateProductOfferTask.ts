import ProductOffer from "App/Models/ProductOffer";
import { IUpdateProductOffer, TaskInterface } from "App/Types/Interfaces";

export default class UpdateProductOfferTask implements TaskInterface {
  public async run(payload: IUpdateProductOffer) {
    const {
      product_id,
      product_offer_id,
      sale_price,
      available_qty,
      color_id,
      // image,
    } = payload;

    const product_offer_exists = ProductOffer.query()
      .where("id", product_offer_id)
      .first();

    if (!product_offer_exists) {
      //TODO: log this error
      throw new Error("Product offer does not exist");
    }
    //TODO: implement image optimization and saving before sending to s3 or find a better alternative  and get the url- 11/10/2023
    // const image_url = "";

    await ProductOffer.query()
      .update({ sale_price, product_id, available_qty, color_id })
      .where("id", product_offer_id);
  }
}
