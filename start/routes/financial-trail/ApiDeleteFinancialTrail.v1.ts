/**
 * @apiGroup           Financial Trail
 * @apiName            Delete Financial trail
 * @api                {post} /api/v1/financial-trail/:financial_trail_id/delete
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
import FinancialTrailController from "App/Controllers/Http/FinancialTrailController";

Route.post("/api/v1/financial-trail/:financial_trail_id/delete", (ctx) =>
  new FinancialTrailController().deleteFinancialTrail(ctx)
)
  .as("delete.financial.trail")
  .middleware(["sessionAuth"]);
