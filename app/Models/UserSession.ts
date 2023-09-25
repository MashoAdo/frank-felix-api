import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class UserSession extends BaseModel {
  public static table = "user_session";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public phone_number: number;

  @column()
  public session_token: string;

  @column()
  public user_agent: string;

  @column()
  public ip_address: number;

  @column.dateTime()
  public expires_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public UpdatedAt: DateTime;
}
