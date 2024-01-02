import Database from "@ioc:Adonis/Lucid/Database";
import { TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";
import Constants from "App/Core/Constants/Constants";

export default class ListProductOffersTask implements TaskInterface {
  //TODO: Implement filtering using query params
  public async run() {
    try {
      const product_offers = await Database.from("product_offer as po")
        .join("product as p", "po.product_id", "p.id")
        .join("product_color as pc", "po.color_id", "pc.id")
        .whereNull("po.deleted_at")
        .select([
          "po.id as id",
          "p.name as product_name",
          "po.sale_price",
          "po.available_qty",
          "pc.name",
          "po.created_at",
          "po.updated_at",
        ])
        .orderBy("po.created_at", "asc")
        // get the page value below from request url
        .paginate(1, Constants.PAGE_LIMIT);

      return product_offers;
    } catch (error) {
      Logger.error("Error while fetching Product Offer trail");

      throw new Error("Product not found");
    }
  }
}
