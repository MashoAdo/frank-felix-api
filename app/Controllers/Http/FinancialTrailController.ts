import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateFinancialTrailTask from "App/Tasks/CreateFinancialTrailTask";
import DeleteFinancialTrailTask from "App/Tasks/DeleteFinancialTrailTask";
import ListFinancialTrailTask from "App/Tasks/ListFinancialTrailTask";
import UpdateFinancialTrailTask from "App/Tasks/UpdateFinancialTrailTask";
import CreateFinancialTrailValidator from "App/Validators/CreateFinancialTrailValidator";
import UpdateFinancialTrailValidator from "App/Validators/UpdateFinancialTrailValidator";

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

  /**
   * createInventoryTrail
   */

  public async updateFinancialTrail({ request }) {
    const payload = await request.validate(UpdateFinancialTrailValidator);
    const { financial_trail_id } = request.params();

    await new UpdateFinancialTrailTask().run({
      ...payload,
      financial_trail_id,
    });

    return {
      success: true,
      success_code: SuccessCodes.UPDATE_FINANCIAL_TRAIL,
      success_message: "Financial trail has been successfully updated",
    };
  }

  /**
   * deleteInventoryTrail
   */

  public async deleteFinancialTrail({ request }) {
    const { financial_trail_id } = request.params();

    await new DeleteFinancialTrailTask().run(financial_trail_id);

    return {
      success: true,
      success_code: SuccessCodes.DELETE_FINANCIAL_TRAIL,
      success_message: "Financial trail has been successfully deleted",
    };
  }
}
