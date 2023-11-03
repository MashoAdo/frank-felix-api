import { TStockMovement } from "App/Types/Interfaces";

export function __getProductQtyAfterMovement(
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

export function __getProductQtyBeforeTrail(
  prev_stock_movement,
  prev_qty_change: number,
  current_qty: number
) {
  if (prev_stock_movement) return current_qty;

  const reversed_stock_movement = prev_stock_movement === "Out" ? "In" : "Out";

  const qty_before_trail = __getProductQtyAfterMovement(
    current_qty,
    prev_qty_change,
    reversed_stock_movement
  );

  return qty_before_trail;
}
