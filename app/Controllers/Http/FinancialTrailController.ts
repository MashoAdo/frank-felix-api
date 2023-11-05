import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateFinancialTrailTask from "App/Tasks/CreateFinancialTrailTask";
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
}
