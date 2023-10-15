import Database from "@ioc:Adonis/Lucid/Database";
import { TaskInterface } from "App/Types/Interfaces";

export default class ListProductOffersTask implements TaskInterface {
  //TODO: Implement filtering using query params
  public async run() {
    return Database.from("product_offer")
      .leftJoin("product", "product.id", "product_offer.product_id")
      .select([
        "product_offer.id",
        "product.name as product_name",
        "product_offer.sale_price",
        "product_offer.available_qty",
        "product_offer.created_at",
        "product_offer.updated_at",
      ])
      .orderBy("product_offer.created_at", "asc");
  }
}
