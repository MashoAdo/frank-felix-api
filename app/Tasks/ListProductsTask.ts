import Constants from "App/Core/Constants/Constants";
import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class ListProductsTask implements TaskInterface {
  public async run() {
    const products = await Product.query()
      .whereNull("deleted_at")
      .select("id", "name", "created_at")
      .orderBy("name", "asc")
      .paginate(1, Constants.PAGE_LIMIT); // get the page value below from request url

    return products;
  }
}
