import { IFinancialTrail, TaskInterface } from "App/Types/Interfaces";
import Logger from "@ioc:Adonis/Core/Logger";
import FinancialTrail from "App/Models/FinancialTrail";

export default class CreateFinancialTrailTask implements TaskInterface {
  public async run(payload: IFinancialTrail) {
    try {
      await FinancialTrail.create({ ...payload });

      return;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed creating Financial trail");
    }
  }
}
