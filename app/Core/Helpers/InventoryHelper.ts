import { TStockMovement } from "App/Types/enums";

export function __getProductQtyAfterTrail(
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

  const new_available_qty =
    stock_movement === "In"
      ? product_offer_qty + qty_change
      : product_offer_qty - qty_change;

  return new_available_qty;
}
