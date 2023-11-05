import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { TStockMovement } from "App/Types/enums";

export default class InventoryTrail extends BaseModel {
  public static table = "inventory_trail";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public product_offer_id: number;

  @column()
  public qty: number;

  @column()
  public stock_movement: TStockMovement;

  @column()
  public notes: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
