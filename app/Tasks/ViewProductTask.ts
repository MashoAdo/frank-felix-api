import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class ViewProductTask implements TaskInterface {
  public async run(product_id: number) {
    const product = await Product.find(product_id);

    if (!product) {
      throw new Error("Product doesn't exist");
    }

    return product;
  }
}
