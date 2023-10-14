import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateInventoryTrailTask from "App/Tasks/CreateInventoryTrailTask";
import CreateInventoryTrailValidator from "App/Validators/CreateInventoryTrailValidator";

export default class InventoryTrailController {
  /**
   * createInventoryTrail
   */

  public async createInventoryTrail({ request }) {
    const payload = await request.validate(CreateInventoryTrailValidator);

    await new CreateInventoryTrailTask().run(payload);
    return {
      success: true,
      success_code: SuccessCodes.CREATE_INVENTORY_TRAIL,
      success_message: "Product movement successfully recorded",
    };
  }
}
