import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone_number: schema.number(),
    first_name: schema.string(),
    last_name: schema.string(),
    password: schema.string(),
  });

  public message: CustomMessages = {};
}
