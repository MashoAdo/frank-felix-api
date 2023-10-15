import Database from "@ioc:Adonis/Lucid/Database";
import Constants from "App/Core/Constants/Constants";
import { DatabaseQueryBuilderContract } from "@ioc:Adonis/Lucid/Database";
import {
  __periodFilter,
  __statusFilter,
} from "App/Core/Helpers/DatabaseModelHelpers";
import {
  IInventoryTrailQueryParams,
  TaskInterface,
} from "App/Types/Interfaces";

export default class ListInventoryTrailTask implements TaskInterface {
  public async run({
    page,
    start_date,
    end_date,
    min_qty,
    max_qty,
    stock_movement,
    product_offer_id,
    product_name,
  }: IInventoryTrailQueryParams) {
    const query: DatabaseQueryBuilderContract<any> = Database.from(
      "inventory_trail"
    )
      .leftJoin(
        "product_offer AS po",
        "po.id",
        "inventory_trail.product_offer_id"
      )
      .leftJoin("product", "product.id", "po.product_id")
      .if(min_qty, (query) => {
        query.where("inventory_trail.qty", ">=", min_qty);
      })
      .if(max_qty, (query) => {
        query.where("inventory_trail.qty", "<=", max_qty);
      })
      .if(product_offer_id, (query) => {
        query.where("inventory_trail.product_offer_id", product_offer_id);
      })
      .if(product_name, (query) => {
        query.whereLike("product.name", `%${product_name}%`);
      })
      .if(stock_movement, (query) => {
        __statusFilter(query, "inventory_trail.stock_movement", stock_movement);
      })
      .if(start_date || end_date, (query) => {
        __periodFilter(query, "inventory_trail.created_at", {
          start: start_date,
          end: end_date,
        });
      })
      .select([
        "product.name as product_name",
        "inventory_trail.qty as qty",
        "po.sale_price",
        "inventory_trail.id",
        "inventory_trail.product_offer_id",
        "inventory_trail.created_at",
        "inventory_trail.stock_movement",
        "inventory_trail.notes",
        "inventory_trail.updated_at",
      ])
      .orderBy("inventory_trail.created_at", "desc");

    const inventory = await query.paginate(page, Constants.PAGE_LIMIT);

    return inventory;
  }
}
