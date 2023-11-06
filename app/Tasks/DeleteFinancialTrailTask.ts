import FinancialTrail from "App/Models/FinancialTrail";
import { TaskInterface } from "App/Types/Interfaces";

export default class DeleteFinancialTrailTask implements TaskInterface {
  public async run(financial_trail_id: number) {
    try {
      await FinancialTrail.query().where("id", financial_trail_id).delete();

      return;
    } catch (error) {
      throw error;
    }
  }
}
