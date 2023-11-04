import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class UpdateProductTask implements TaskInterface {
  public async run(name: string, product_id: number) {
    const product = await Product.find(product_id);

    if (!product) {
      //TODO: throw from code
      throw new Error("Product doesn't exist");
    }

    await Product.query().update({ name }).where("id", product_id);
  }
}
