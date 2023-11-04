/**
 * @apiGroup           Inventory Trail
 * @apiName            Delete Inventory trail
 * @api                {post} /api/v1/inventory/delete
 * @apiDescription     View products
 * @apiVersion         1.0.0
 * 
 * 
 * @apiParam   {Number}     inventory_trail_id    Comment on the trail
 
 * @apiHeader          Accept application/json
 *
 * @apiSuccessExample  {json}    Success-Response:
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

Route.post("/api/v1/inventory/:inventory_trail_id/delete", (ctx) =>
  new InventoryTrailController().deleteInventoryTrail(ctx)
)
  .as("delete.inventory.trail")
  .middleware(["sessionAuth"]);
