import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class listProductsTask implements TaskInterface {
  public async run() {
    const products = Product.query()
      .select("id", "name", "created_at")
      .orderBy("name", "asc");

    return products;
  }
}