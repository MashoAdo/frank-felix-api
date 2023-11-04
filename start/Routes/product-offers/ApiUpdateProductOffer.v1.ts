/**
 * @apiGroup           Product offer
 * @apiName            update product offer
 * @api                {post} /api/v1/product-offer/update
 * @apiDescription     Updates a particular product offer
 * @apiVersion         1.0.0
 * 
 * 
 * @apiBody   {String}    product_id            product's id
 * @apiBody   {String}    sale_price            Product offer sale price
 * @apiBody   {String}    available_qty         Available qty
 * @apiBody   {String}    color_id              Color id 
 * @apiBody   {String}    image                 Product offer image
 
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

Route.post("/api/v1/product-offers/:product_offer_id/update", (ctx) =>
  new ProductOfferController().updateProductOffer(ctx)
)
  .as("update.product.offer")
  .middleware(["sessionAuth"]);
