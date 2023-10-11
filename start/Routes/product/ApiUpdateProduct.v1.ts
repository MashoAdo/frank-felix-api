/**
 * @apiGroup           Product
 * @apiName            Update product
 * @api                {post} /api/v1/products/:product_id/update
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

Route.post("/api/v1/products/:product_id/update", (ctx) =>
  new ProductController().updateProduct(ctx)
).as("update.product");
