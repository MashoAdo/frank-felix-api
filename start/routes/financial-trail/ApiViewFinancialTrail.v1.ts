/**
 * @apiGroup           Financial Trail
 * @apiName            view financial trail
 * @api                {post} /api/v1/financial_trail_id/:financial_trail_id/view
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

Route.get("/api/v1/financial_trail_id/:financial_trail_id/view", (ctx) =>
  new InventoryTrailController().viewInventoryTrail(ctx)
)
  .as("view.financial.trail")
  .middleware(["sessionAuth"]);
