import { TStockMovement } from "App/Types/Interfaces";

export function __getProductOfferQty(
  product_offer_qty: number,
  qty_change: number,
  stock_movement: TStockMovement
) {
  if (!stock_movement || !qty_change) return product_offer_qty;

  if (stock_movement === "Out" && product_offer_qty < qty_change) {
    throw new Error(
      `Available number of products is not enough to complete this stock movement. You only have ${product_offer_qty} remaining.`
    );
  }

  return stock_movement === "In"
    ? product_offer_qty + qty_change
    : product_offer_qty - qty_change;
}
