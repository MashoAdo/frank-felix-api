import Database, {
  DatabaseQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Database";
import Constants from "App/Core/Constants/Constants";
import {
  __periodFilter,
  __statusFilter,
} from "App/Core/Helpers/DatabaseModelHelpers";
import {
  IFinancialTrailQueryParams,
  TaskInterface,
} from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";

export default class ListFinancialTrailTask implements TaskInterface {
  public async run({
    start_date,
    end_date,
    min_amount,
    max_amount,
    trail_direction,
    trail_type,
    page,
  }: IFinancialTrailQueryParams) {
    try {
      const query: DatabaseQueryBuilderContract<any> = Database.from(
        "financial_trail"
      )
        .if(min_amount, (query) => {
          query.where("financial_trail.amount", ">=", min_amount);
        })
        .if(max_amount, (query) => {
          query.where("financial_trail.amount", "<=", max_amount);
        })
        .if(trail_direction, (query) => {
          __statusFilter(
            query,
            "financial_trail.trail_direction",
            trail_direction
          );
        })
        .if(trail_type, (query) => {
          __statusFilter(query, "financial_trail.trail_type", trail_type);
        })
        .if(start_date || end_date, (query) => {
          __periodFilter(query, "financial_trail.created_at", {
            start: start_date,
            end: end_date,
          });
        })
        .select([
          "financial_trail.id",
          "financial_trail.amount",
          "financial_trail.usd_rate",
          "financial_trail.trail_type",
          "financial_trail.trail_direction",
          "financial_trail.created_at",
          "financial_trail.updated_at",
        ])
        .orderBy("financial_trail.created_at", "desc");

      const financial_trail = await query.paginate(page, Constants.PAGE_LIMIT);

      return financial_trail;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed fetching financial trail");
    }
  }
}
