import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class FinancialTrail extends BaseModel {
  public static table = "financial_trail";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number;

  @column()
  public usd_rate: number;

  @column()
  public trail_type: "Cash" | "Bank" | "Mpesa";

  @column()
  public trail_direction: "In" | "Out";

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
