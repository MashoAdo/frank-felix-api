/**
 * @apiGroup           Product
 * @apiName            List product offers
 * @api                {get} /api/v1/product-offers
 * @apiDescription     List products
 * @apiVersion         1.0.0
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
import ProductOfferController from "App/Controllers/Http/ProductOfferController";

Route.get("/api/v1/product-offers", () =>
  new ProductOfferController().listProductOffers()
)
  .as("list.product.offers")
  .middleware(["sessionAuth"]);
