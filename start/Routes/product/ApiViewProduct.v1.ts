/**
 * @apiGroup           Product
 * @apiName            View product
 * @api                {get} /api/v1/products/:product_id
 * @apiDescription     View products
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
import ProductController from "App/Controllers/Http/ProductController";

Route.get("/api/v1/products/:product_id", (ctx) =>
  new ProductController().viewProduct(ctx)
)
  .as("view.product")
  .middleware(["sessionAuth"]);
