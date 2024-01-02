import Database from "@ioc:Adonis/Lucid/Database";
import { TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";
import ProductOffer from "App/Models/ProductOffer";
import { DateTime } from "luxon";
import Constants from "App/Core/Constants/Constants";

export default class DeleteProductOfferTask implements TaskInterface {
  public async run(product_offer_id: number) {
    try {
      const product_offer: ProductOffer = await Database.from("product_offer")
        .where("id", product_offer_id)
        .first();

      if (!product_offer) throw new Error("Product does not exist");

      if (product_offer.deleted_at) throw new Error("Product already deleted");

      await Database.from("product_offer")
        .where("id", product_offer_id)
        .update({
          deleted_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
        });
    } catch (error) {
      Logger.error(error);

      throw new Error(
        `Failed when deleting Product offer with ID ${product_offer_id}`
      );
    }
    return;
  }
}
