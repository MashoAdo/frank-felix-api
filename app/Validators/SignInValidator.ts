import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";

export default class SignInValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone_number: schema.number([]),
    password: schema.string(),
  });

  public message: CustomMessages = {};
}
