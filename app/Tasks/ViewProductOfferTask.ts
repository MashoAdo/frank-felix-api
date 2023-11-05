import { TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ViewProductOfferTask implements TaskInterface {
  public async run(product_offer_id: number) {
    try {
      const product_offer = await Database.from("product_offer as po")
        .join("product as p", "po.product_id", "p.id")
        .join("product_color as pc", "po.color_id", "pc.id")
        .where("po.id", product_offer_id)
        .select([
          "po.id as id",
          "p.name as product_name",
          "po.available_qty",
          "po.image_url",
          "po.sale_price",
          "pc.name as product_color",
          "po.created_at as created_at",
          "po.updated_at as updated_at",
        ])
        .firstOrFail();

      return product_offer;
    } catch (error) {
      Logger.error("Error while fetching Product Offer trail");

      throw new Error("Product not found");
    }
  }
}
