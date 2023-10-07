import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.required()]),
  });

  public message: CustomMessages = {};
}
