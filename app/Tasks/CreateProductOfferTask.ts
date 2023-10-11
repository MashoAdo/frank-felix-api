import ProductOffer from "App/Models/ProductOffer";
import { IProductOffer, TaskInterface } from "App/Types/Interfaces";

export default class CreateProductOfferTask implements TaskInterface {
  public async run(payload: IProductOffer) {
    const { product_id, sale_price, available_qty, color_id } = payload;

    //TODO: implement image optimization and saving before sending to s3 or find a better alternative  and get the url- 11/10/2023
    const image_url = "";

    const product_offer = await ProductOffer.create({
      product_id,
      sale_price,
      available_qty,
      color_id,
      image_url,
    });

    return product_offer;
  }
}
