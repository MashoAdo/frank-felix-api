import Database from "@ioc:Adonis/Lucid/Database";
import { TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";

export default class DeleteProductOfferTask implements TaskInterface {
  public async run(product_offer_id: number) {
    try {
      await Database.from("product_offer")
        .where("id", product_offer_id)
        .delete();
    } catch (error) {
      Logger.error(
        `Failed when deleting Product offer with ID ${product_offer_id}`,
        error
      );
      throw new Error(
        `Failed when deleting Product offer with ID ${product_offer_id}`
      );
    }
    return;
  }
}
