import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class ProductOffer extends BaseModel {
  public static table = "product_offer";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public sale_price: number;

  @column()
  public available_qty: number;

  @column()
  public color_id: number;

  @column()
  public image_url: string;

  @column()
  public product_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
