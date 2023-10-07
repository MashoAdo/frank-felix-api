import Product from "App/Models/Product";
import { TaskInterface } from "App/Types/Interfaces";

export default class CreateProductTask implements TaskInterface {
  public async run(name: string) {
    const product_exists = await Product.query().where("name", name).first();

    if (product_exists) {
      throw new Error("Product with similar name already exists");
    }

    const product = await Product.create({ name });

    return product;
  }
}
