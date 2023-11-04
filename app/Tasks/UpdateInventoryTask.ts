import Database, {
  TransactionClientContract,
} from "@ioc:Adonis/Lucid/Database";
import {
  __getProductQtyAfterMovement,
  __getProductQtyBeforeTrail,
} from "App/Core/Helpers/InventoryHelper";
import InventoryTrail from "App/Models/InventoryTrail";
import ProductOffer from "App/Models/ProductOffer";
import {
  IUpdateInventoryTrail,
  TStockMovement,
  TaskInterface,
} from "App/Types/Interfaces";

class UpdateInventoryTask implements TaskInterface {
  public async run({
    inventory_trail_id,
    updated_qty,
    updated_notes,
    updated_stock_movement,
  }: IUpdateInventoryTrail) {
    await Database.transaction(async (trx: TransactionClientContract) => {
      const inventory = await this.findInventoryOrThrow(inventory_trail_id);

      const productOffer = await this.findProductOfferOrThrow(
        inventory.product_offer_id
      );

      const new_available_qty = this.calculateNewQtyAfterUpdate(
        inventory,
        updated_qty,
        updated_stock_movement,
        productOffer.available_qty
      );

      await this.updateProductOffer(productOffer, new_available_qty, trx);

      await this.updateInventoryTrail(
        inventory,
        { updated_qty, updated_stock_movement, updated_notes },
        trx
      );
    });
  }

  private async findInventoryOrThrow(targetedInventoryId: number) {
    try {
      const inventory = await InventoryTrail.findOrFail(targetedInventoryId);
      return inventory;
    } catch (error) {
      throw new Error("The targeted inventory record does not exist");
    }
  }

  private async findProductOfferOrThrow(productOfferId: number) {
    try {
      const productOffer = await ProductOffer.findOrFail(productOfferId);
      return productOffer;
    } catch (error) {
      throw new Error("The targeted product offer does not exist");
    }
  }

  private calculateNewQtyAfterUpdate(
    inventory: InventoryTrail,
    updated_qty: number | undefined,
    updated_stock_movement: TStockMovement | undefined,
    current_product_offer_qty: number
  ) {
    const new_qty = updated_qty || inventory.qty;
    const new_stock_movement =
      updated_stock_movement || inventory.stock_movement;

    const qty_before_trail = __getProductQtyBeforeTrail(
      inventory.stock_movement,
      inventory.qty,
      current_product_offer_qty
    );

    const qty_after_update = __getProductQtyAfterMovement(
      qty_before_trail,
      new_qty,
      new_stock_movement
    );

    return qty_after_update;
  }

  private async updateProductOffer(
    productOffer: ProductOffer,
    availableQty: number,
    trx: TransactionClientContract
  ) {
    try {
      productOffer.available_qty = availableQty;
      productOffer.useTransaction(trx);
      await productOffer.save();
    } catch (error) {
      throw new Error("Error occurred while updating product offer");
    }
  }
  private async updateInventoryTrail(
    inventory: InventoryTrail,
    {
      updated_qty,
      updated_stock_movement,
      updated_notes,
    }: Partial<IUpdateInventoryTrail>,
    trx: TransactionClientContract
  ) {
    try {
      inventory.useTransaction(trx);
      inventory.merge({
        qty: updated_qty,
        stock_movement: updated_stock_movement,
        notes: updated_notes,
      });
      await inventory.save();
    } catch (error) {
      throw new Error("Error occurred while updating inventory trail");
    }
  }
}

export default UpdateInventoryTask;
