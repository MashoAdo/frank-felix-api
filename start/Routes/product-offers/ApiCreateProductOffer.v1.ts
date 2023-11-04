/**
 * @apiGroup           Product offer
 * @apiName            Create product offer
 * @api                {post} /api/v1/product-offer/create
 * @apiDescription     View products
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

Route.post("/api/v1/product-offers/create", (ctx) =>
  new ProductOfferController().createProductOffer(ctx)
)
  .as("create.product.offer")
  .middleware(["sessionAuth"]);
