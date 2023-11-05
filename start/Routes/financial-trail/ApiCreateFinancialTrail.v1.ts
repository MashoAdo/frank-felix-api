/**
 * @apiGroup           Financial Trail
 * @apiName            Create Financial trail
 * @api                {post} /api/v1/financial-trail/create
 * @apiDescription     View products
 * @apiVersion         1.0.0
 * 
 * 
 * @apiBody   {Number}    product_offer_id      product offer id
 * @apiBody   {Number}    quantity              Quantity 
 * @apiBody   {String}    stock_movement        In or Out
 * @apiBody   {String}    notes                 Comment on the trail
 
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

Route.post("/api/v1/financial-trail/create", (ctx) =>
  new InventoryTrailController().createInventoryTrail(ctx)
)
  .as("create.financial.trail")
  .middleware(["sessionAuth"]);
