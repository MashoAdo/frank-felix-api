/**
 * @apiGroup           Financial Trail
 * @apiName            list inventory
 * @api                {get} /api/v1/financial-trail
 * @apiDescription     List Inventory Trail
 * @apiVersion         1.0.0
 *
 * @apiParams  {string} start_date
 * @apiParams  {string} end_date
 * @apiParams  {string} stock_movement
 * @apiParams  {string} product_names
 * @apiParams  {number} product_offer_id
 * @apiParams  {number} max_qty
 * @apiParams  {number} min_qty
 * @apiParams  {number} page
 *
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

Route.get("/api/v1/financial-trail", ({ request }) =>
  new InventoryTrailController().listInventoryTrail({ request })
)
  .as("list.financial.trail")
  .middleware(["sessionAuth"]);
