import Database from "@ioc:Adonis/Lucid/Database";
import { TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";

export default class ViewInventoryTrailTask implements TaskInterface {
  public async run(inventory_trail_id: number) {
    try {
      const inventory_trail = await Database.from("inventory_trail as it")
        .join("product_offer as po", "it.product_offer_id", "po.id")
        .join("product as p", "po.product_id", "p.id")
        .join("product_color as pc", "po.color_id", "pc.id")
        .where("it.id", inventory_trail_id)
        .select([
          "it.id as id",
          "p.product_name as product_name",
          "it.qty",
          "it.stock_movement",
          "it.product_offer_id as product_offer_id",
          "pc.name as product_color",
          "it.notes",
          "it.created_at as created_at",
          "it.updated_at as updated_at",
        ])
        .firstOrFail();

      return inventory_trail;
    } catch (error) {
      Logger.error("Error while fetching Inventory trail");
      throw new Error("Inventory trail not found");
    }
  }
}
