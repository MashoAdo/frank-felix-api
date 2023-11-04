/**
 * @apiGroup           Inventory Trail
 * @apiName            Create Inventory trail
 * @api                {post} /api/v1/inventory/:inventory_trail_id/view
 * @apiDescription     View Inventory trail
 * @apiVersion         1.0.0
 *
 *
 * @apiParam         {number}  inventory_trail_id
 *
 * @apiHeader          Accept application/json
 *
 * @apiSuccessExample  {json}    Success-Response:
 *
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "success_code": ,
 *   "success_message": "",
 *   "data":[]
 * }
 *
 **/
import Route from "@ioc:Adonis/Core/Route";
import InventoryTrailController from "App/Controllers/Http/InventoryTrailController";

Route.post("/api/v1/inventory/:inventory_trail_id/view", (ctx) =>
  new InventoryTrailController().updateInventoryTrail(ctx)
)
  .as("update.inventory.trail")
  .middleware(["sessionAuth"]);
