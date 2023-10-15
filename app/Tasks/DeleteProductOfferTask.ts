import Database from "@ioc:Adonis/Lucid/Database";
import { TaskInterface } from "App/Types/Interfaces";

export default class DeleteProductOfferTask implements TaskInterface {
  public async run(product_offer_id: number) {
    await Database.from("product_offer").where("id", product_offer_id).delete();

    return;
  }
}
