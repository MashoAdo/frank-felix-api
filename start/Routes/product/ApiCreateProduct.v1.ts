/**
 * @apiGroup           Product
 * @apiName            Create product
 * @api                {post} /api/v1/products/create
 * @apiDescription     View products
 * @apiVersion         1.0.0
 * 
 * 
 * @apiBody   {String}    name            product's name
 
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

Route.post("/api/v1/products/create", (ctx) =>
  new ProductController().createProduct(ctx)
).as("create.product");
