import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";

export default class UpdateProductOfferValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.number.optional([
      rules.exists({ table: "product", column: "id" }),
    ]),
    sale_price: schema.number.optional([rules.unsigned()]),
    available_qty: schema.number.optional([rules.unsigned()]),
    color_id: schema.number.optional([
      rules.exists({ table: "product_color", column: "id" }),
    ]),
    image: schema.file.optional({
      extnames: ["jpg", "jpeg", "png"],
    }),
  });

  public messages: CustomMessages = {
    "product_id.exists": "Product you selected does not exist",
    "sale_price.unsigned": "Sale price must be a positive number.",
    "available_qty.unsigned": "Available quantity must be a positive number.",
    "color_id.exists": "The selected color does not exist.",
    "image.extnames": "Image must be in JPG, JPEG, or PNG format.",
  };
}
