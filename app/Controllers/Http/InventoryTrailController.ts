import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateInventoryTrailTask from "App/Tasks/CreateInventoryTrailTask";
import DeleteInventoryTrailTask from "App/Tasks/DeleteInventoryTrailTask";
import ListInventoryTrailTask from "App/Tasks/ListInventoryTask";
import UpdateInventoryTask from "App/Tasks/UpdateInventoryTask";
import ViewInventoryTrailTask from "App/Tasks/ViewInventoryTrailTask";
import CreateInventoryTrailValidator from "App/Validators/CreateInventoryTrailValidator";
import UpdateInventoryTrailValidator from "App/Validators/UpdateInventoryValidator";

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

  /**
   * viewInventoryTrail
   */

  public async viewInventoryTrail({ request }) {
    const { inventory_trail_id } = request.params();

    return {
      success: true,
      success_code: SuccessCodes.VIEW_INVENTORY_TRAIL,
      success_message: "Inventory trail was successfully fetched",

      data: await new ViewInventoryTrailTask().run(inventory_trail_id),
    };
  }

  /**
   * listInventoryTrail
   */

  public async listInventoryTrail({ request }) {
    const query = request.qs();
    return {
      success: true,
      success_code: SuccessCodes.LIST_INVENTORY_TRAIL,
      success_message: "Inventory list",
      data: await new ListInventoryTrailTask().run(query),
    };
  }

  /**
   * updateInventoryTrail
   */

  public async updateInventoryTrail({ request }) {
    const payload = await request.validate(UpdateInventoryTrailValidator);
    const { inventory_trail_id } = request.params();

    await new UpdateInventoryTask().run({ ...payload, inventory_trail_id });

    return {
      success: true,
      success_code: SuccessCodes.CREATE_INVENTORY_TRAIL,
      success_message: "Inventory  movement was successfully updated",
    };
  }

  /**
   * deleteInventoryTrail
   */

  public async deleteInventoryTrail({ request }) {
    const { inventory_trail_id } = request.params();

    await new DeleteInventoryTrailTask().run(inventory_trail_id);

    return {
      success: true,
      success_code: SuccessCodes.DELETE_INVENTORY_TRAIL,
      success_message: "Inventory  movement was successfully updated",
    };
  }
}
