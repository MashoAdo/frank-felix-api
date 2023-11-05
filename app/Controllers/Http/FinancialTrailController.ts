import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateFinancialTrailTask from "App/Tasks/CreateFinancialTrailTask";
import ListFinancialTrailTask from "App/Tasks/ListFinancialTrailTask";
import CreateFinancialTrailValidator from "App/Validators/CreateFinancialTrailValidator";

export default class FinancialTrailController {
  /**
   * createInventoryTrail
   */

  public async createFinancialTrail({ request }) {
    const payload = await request.validate(CreateFinancialTrailValidator);

    await new CreateFinancialTrailTask().run(payload);

    return {
      success: true,
      success_code: SuccessCodes.CREATE_FINANCIAL_TRAIL,
      success_message: "Financial trail has been successfully recorded",
    };
  }

  /**
   * createInventoryTrail
   */

  public async listFinancialTrail({ request }) {
    // const payload = await request.validate(CreateFinancialTrailValidator);
    const query = request.qs();

    return {
      success: true,
      success_code: SuccessCodes.CREATE_FINANCIAL_TRAIL,
      success_message: "Financial trail list",
      data: await new ListFinancialTrailTask().run(query),
    };
  }
}
