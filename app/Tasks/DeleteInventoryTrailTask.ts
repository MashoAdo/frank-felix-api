import InventoryTrail from "App/Models/InventoryTrail";
import { IInventoryTrail, TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";
import Database, {
  TransactionClientContract,
} from "@ioc:Adonis/Lucid/Database";
import ProductOffer from "App/Models/ProductOffer";
import { __getProductQtyAfterTrail } from "App/Core/Helpers/InventoryHelper";

export default class DeleteInventoryTrailTask implements TaskInterface {
  public async run(inventory_trail_id: number) {
    try {
      await Database.transaction(async (trx: TransactionClientContract) => {
        //delete inventory trail by id
        const inventory_trail = await this.deleteTrail(inventory_trail_id, trx);

        //reverse inventory effect on product offer
        await this.reverseTrailEffectOnProductQty(
          {
            product_offer_id: inventory_trail.product_offer_id,
            stock_movement: inventory_trail.stock_movement,
            qty: inventory_trail.qty,
          },
          trx
        );
      });
    } catch (error) {
      Logger.error(
        `Failed when deleting Inventory Trail with ID ${inventory_trail_id}`,
        error
      );
      throw error;
    }
    return;
  }

  private async deleteTrail(
    inventory_trail_id: number,
    trx: TransactionClientContract
  ) {
    const inventory_trail = await InventoryTrail.findOrFail(inventory_trail_id);

    inventory_trail.useTransaction(trx);

    await inventory_trail.delete();

    return inventory_trail;
  }

  private async reverseTrailEffectOnProductQty(
    inventory_trail: Partial<IInventoryTrail>,
    trx: TransactionClientContract
  ) {
    const product_offer = await ProductOffer.findOrFail(
      inventory_trail.product_offer_id,
      {
        client: trx,
      }
    );

    const qty_before_inventory_trail = __getProductQtyAfterTrail(
      product_offer.available_qty,
      inventory_trail.qty!,
      //Reverse stock movement to undo effect of the trail being deleted on the product offer
      inventory_trail.stock_movement === "Out" ? "In" : "Out"
    );

    product_offer.useTransaction(trx);

    product_offer.available_qty = qty_before_inventory_trail;

    await product_offer.save();

    return;
  }
}
