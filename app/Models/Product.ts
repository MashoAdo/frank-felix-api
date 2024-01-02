import { column, BaseModel } from "@ioc:Adonis/Lucid/Orm";

import { DateTime } from "luxon";

export default class Product extends BaseModel {
  public static table = "product";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.dateTime()
  public deleted_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
