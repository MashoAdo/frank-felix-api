/**
 * @apiGroup           Product
 * @apiName            Delete product
 * @api                {post} /api/v1/products/:product_id/delete
 * @apiDescription     Delete products
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

Route.post("/api/v1/products/:product_id/delete", (ctx) =>
  new ProductController().deleteProduct(ctx)
).as("delete.product");
