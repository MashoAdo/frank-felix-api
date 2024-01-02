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
      "inventory_trail as it"
    )
      .leftJoin("product_offer as po", "po.id", "it.product_offer_id")
      .leftJoin("product as p", "p.id", "po.product_id")
      .join("product_color as pc", "po.color_id", "pc.id")
      .if(min_qty, (query) => {
        query.where("it.qty", ">=", min_qty);
      })
      .if(max_qty, (query) => {
        query.where("it.qty", "<=", max_qty);
      })
      .if(product_offer_id, (query) => {
        query.where("it.product_offer_id", product_offer_id);
      })
      .if(product_name, (query) => {
        query.whereLike("p.name", `%${product_name}%`);
      })
      .if(stock_movement, (query) => {
        __statusFilter(query, "it.stock_movement", stock_movement);
      })
      .if(start_date || end_date, (query) => {
        __periodFilter(query, "it.created_at", {
          start: start_date,
          end: end_date,
        });
      })
      .select([
        "it.id",
        "it.product_offer_id",
        "p.name as product_name",
        "pc.name as product_color",
        "it.qty as qty",
        "po.sale_price",
        "it.stock_movement",
        "it.notes",
        "it.created_at",
        "it.updated_at",
      ])
      .orderBy("it.created_at", "desc");

    const inventory = await query.paginate(page, Constants.PAGE_LIMIT);

    return inventory;
  }
}
