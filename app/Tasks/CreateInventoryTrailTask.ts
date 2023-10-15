import ProductOffer from "App/Models/ProductOffer";
import { IInventoryTrail, TaskInterface } from "App/Types/Interfaces";
import Database, {
  TransactionClientContract,
} from "@ioc:Adonis/Lucid/Database";
import { DateTime } from "luxon";
import Constants from "App/Core/Constants/Constants";
import { __getProductOfferQty } from "App/Core/Helpers/InventoryHelper";

export default class CreateInventoryTrailTask implements TaskInterface {
  public async run({
    product_offer_id,
    qty,
    stock_movement,
    notes,
  }: IInventoryTrail) {
    await Database.transaction(async (trx: TransactionClientContract) => {
      const product_offer = await ProductOffer.find(product_offer_id);

      if (!product_offer) {
        throw new Error("Product offer not found.");
      }

      const { available_qty } = product_offer;

      const new_available_qty = __getProductOfferQty(
        available_qty,
        qty,
        stock_movement
      );

      console.log(available_qty, qty, new_available_qty);

      // Update available_qty directly in the ProductOffer model
      product_offer.available_qty = new_available_qty;

      product_offer.useTransaction(trx);

      await product_offer.save();

      // Insert the inventory trail record
      await trx
        .insertQuery()
        .table("inventory_trail")
        .insert({
          product_offer_id,
          qty,
          stock_movement,
          notes,
          created_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
        });
    });

    return;
  }
}
