/**
 * @apiGroup           Product offer
 * @apiName            delete product offer
 * @api                {post} /api/v1/product-offer/delete
 * @apiDescription     deletes a particular product offer
 * @apiVersion         1.0.0
 * 
 * 
 * @apiParam   {String}    product_id            product's id

 
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

Route.post("/api/v1/product-offers/:product_offer_id/delete", (ctx) =>
  new ProductOfferController().deleteProductOffer(ctx)
)
  .as("delete.product.offer")
  .middleware(["sessionAuth"]);
