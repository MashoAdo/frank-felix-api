import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class DeleteProductTask implements TaskInterface {
  public async run(product_id: number) {
    const product = await Product.find(product_id);

    if (!product) {
      //TODO: throw from code
      throw new Error("Product doesn't exist");
    }

    await Product.query().where("id", product_id).delete();
  }
}
