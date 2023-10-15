import Database, {
  TransactionClientContract,
} from "@ioc:Adonis/Lucid/Database";
import { __getProductOfferQty } from "App/Core/Helpers/InventoryHelper";
import InventoryTrail from "App/Models/InventoryTrail";
import ProductOffer from "App/Models/ProductOffer";
import {
  IUpdateInventoryTrail,
  TStockMovement,
  TaskInterface,
} from "App/Types/Interfaces";

class UpdateInventoryTask implements TaskInterface {
  public async run({
    inventory_id,
    qty,
    notes,
    stock_movement,
  }: IUpdateInventoryTrail) {
    await Database.transaction(
      async (transaction: TransactionClientContract) => {
        const inventory = await this.findInventoryOrFail(inventory_id);

        const productOffer = await this.findProductOfferOrFail(
          inventory.product_offer_id
        );

        const new_available_qty = this.calculateNewQtyAfterUpdate(
          inventory,
          qty,
          stock_movement,
          productOffer.available_qty
        );

        await this.updateProductOffer(
          productOffer,
          new_available_qty,
          transaction
        );

        inventory.useTransaction(transaction);

        inventory.merge({
          qty,
          stock_movement,
          notes,
        });

        await inventory.save();
      }
    );
  }

  private async findInventoryOrFail(inventoryId: number) {
    const inventory = await InventoryTrail.find(inventoryId);
    if (!inventory) {
      throw new Error("The record you are trying to update does not exist");
    }
    return inventory;
  }

  private async findProductOfferOrFail(productOfferId: number) {
    const productOffer = await ProductOffer.find(productOfferId);
    if (!productOffer) {
      throw new Error(
        "Product you are trying to update its inventory does not exist"
      );
    }
    return productOffer;
  }

  private calculateNewQtyAfterUpdate(
    inventory: InventoryTrail,
    qty: number | undefined,
    stock_movement: TStockMovement | undefined,
    current_product_offer_qty: number
  ) {
    const new_qty = qty !== undefined ? qty : inventory.qty;
    const new_stock_movement = stock_movement || inventory.stock_movement;

    return this.getProductOfferQtyAfterUpdate(
      inventory.qty,
      inventory.stock_movement,
      new_qty,
      new_stock_movement,
      current_product_offer_qty
    );
  }

  private getProductOfferQtyAfterUpdate(
    prev_inventory_qty: number,
    prev_inventory_movement: TStockMovement,
    new_inventory_qty: number,
    new_inventory_movement: TStockMovement,
    current_product_offer_qty: number
  ) {
    const reversed_stock_movement =
      prev_inventory_movement === "Out" ? "In" : "Out";

    const reverseProductOfferQty = __getProductOfferQty(
      current_product_offer_qty,
      prev_inventory_qty,
      reversed_stock_movement
    );

    return __getProductOfferQty(
      reverseProductOfferQty,
      new_inventory_qty,
      new_inventory_movement
    );
  }

  private async updateProductOffer(
    productOffer: ProductOffer,
    available_qty: number,
    transaction: TransactionClientContract
  ) {
    productOffer.available_qty = available_qty;

    productOffer.useTransaction(transaction);

    return await productOffer.save();
  }
}

export default UpdateInventoryTask;
