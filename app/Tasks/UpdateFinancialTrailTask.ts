import FinancialTrail from "App/Models/FinancialTrail";
import { IUpdateFinancialTrail, TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";

export default class UpdateFinancialTrailTask implements TaskInterface {
  public async run({
    amount,
    usd_rate,
    trail_type,
    trail_direction,
    financial_trail_id,
  }: IUpdateFinancialTrail) {
    try {
      const financial_trail_exists = await FinancialTrail.find(
        financial_trail_id
      );

      if (!financial_trail_exists) {
        throw new Error("The financial trail you are updating does not exists");
      }

      financial_trail_exists.merge({
        amount,
        usd_rate,
        trail_direction,
        trail_type,
      });

      await financial_trail_exists.save();

      return;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
