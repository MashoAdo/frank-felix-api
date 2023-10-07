import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateProductTask from "App/Tasks/CreateProductTask";
import listProductsTask from "App/Tasks/ListProductsTask";
import viewProductTask from "App/Tasks/ViewProductTask";
import CreateProductValidator from "App/Validators/createProductValidator";

export default class ProductController {
  public async listProducts() {
    return {
      success: true,
      success_code: SuccessCodes.LIST_PRODUCTS,
      success_message: "List of products",
      data: await new listProductsTask().run(),
    };
  }

  public async viewProduct({ request }) {
    const product_id = request.routeParams.product_id;

    return {
      success: true,
      success_code: SuccessCodes.VIEW_PRODUCT,
      success_message: "View of products",
      data: await new viewProductTask().run(product_id),
    };
  }

  public async createProduct({ request }) {
    const payload = await request.validate(CreateProductValidator);

    return {
      success: true,
      success_code: SuccessCodes.CREATE_PRODUCT,
      success_message: "Product successfully created",
      data: await new CreateProductTask().run(payload.name),
    };
  }
}