import { column, BaseModel } from "@ioc:Adonis/Lucid/Orm";

import { DateTime } from "luxon";

export default class User extends BaseModel {
  public static table = "user";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public phone_number: string;

  @column({ serializeAs: null })
  public password_hash: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
