import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { TTrailDirection, TTrailType } from "App/Types/enums";
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
  public trail_type: TTrailType;

  @column()
  public trail_direction: TTrailDirection;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
