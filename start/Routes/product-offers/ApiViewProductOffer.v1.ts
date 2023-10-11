/**
 * @apiGroup           Product offer
 * @apiName            View product offer
 * @api                {get} /api/v1/product-offer/:product_offer_id
 * @apiDescription     View product offer
 * @apiVersion         1.0.0
 
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
import ProductOfferController from "App/Controllers/Http/ProductOfferController";

Route.get("/api/v1/product-offers/:product_offer_id", (ctx) =>
  new ProductOfferController().viewProductOffer(ctx)
).as("view.product.offer");
