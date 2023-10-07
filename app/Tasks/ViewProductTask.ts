import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class viewProductTask implements TaskInterface {
  public async run(product_id: number) {
    const product = Product.find(product_id);

    if (!product) {
      //TODO: throw from code
      throw new Error("Product doesn't exist");
    }

    return product;
  }
}
