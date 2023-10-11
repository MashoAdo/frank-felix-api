import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class ListProductsTask implements TaskInterface {
  public async run() {
    const products = await Product.query()
      .select("id", "name", "created_at")
      .orderBy("name", "asc");

    return products;
  }
}
