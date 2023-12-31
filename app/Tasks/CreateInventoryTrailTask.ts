import ProductOffer from "App/Models/ProductOffer";
import { IInventoryTrail, TaskInterface } from "App/Types/Interfaces";
import Database, {
  TransactionClientContract,
} from "@ioc:Adonis/Lucid/Database";
import { DateTime } from "luxon";
import Constants from "App/Core/Constants/Constants";
import { __getProductQtyAfterTrail } from "App/Core/Helpers/InventoryHelper";
import Logger from "@ioc:Adonis/Core/Logger";
import { TStockMovement } from "App/Types/enums";

export default class CreateInventoryTrailTask implements TaskInterface {
  public async run({
    product_offer_id,
    qty,
    stock_movement,
    notes,
  }: IInventoryTrail) {
    try {
      await Database.transaction(async (trx: TransactionClientContract) => {
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

        // Update product offer
        await this.updateProductOffer(
          product_offer_id,
          stock_movement,
          qty,
          trx
        );
      });
    } catch (error) {
      Logger.error("Error occurred while creating inventory trail");
      throw error;
    }
  }

  private async updateProductOffer(
    product_offer_id: number,
    stock_movement: TStockMovement,
    qty: number,
    trx: TransactionClientContract
  ) {
    const product_offer = await ProductOffer.find(product_offer_id, {
      client: trx,
    });

    if (!product_offer) {
      throw new Error("Product offer not found.");
    }

    const { available_qty } = product_offer;
    const new_available_qty = __getProductQtyAfterTrail(
      available_qty,
      qty,
      stock_movement
    );

    // Update available_qty directly in the ProductOffer model
    product_offer.available_qty = new_available_qty;

    await product_offer.save();
  }
}
