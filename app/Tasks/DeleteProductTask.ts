import Database from "@ioc:Adonis/Lucid/Database";
import Constants from "App/Core/Constants/Constants";
import { TaskInterface } from "App/Types/Interfaces";
import { DateTime } from "luxon";

export default class DeleteProductTask implements TaskInterface {
  public async run(product_id: number) {
    const product = await Database.from("product")
      .where("id", product_id)
      .first();

    if (!product) {
      //TODO: throw from code
      throw new Error("Product does not exist");
    }

    if (product.deleted_at) throw new Error("Product already deleted");

    await Database.from("product")
      .where("id", product_id)
      .update({
        deleted_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
      });
  }
}
