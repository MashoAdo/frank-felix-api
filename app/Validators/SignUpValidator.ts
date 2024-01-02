import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone_number: schema.number([
      rules.unique({ table: "user", column: "phone_number" }),
      rules.trim(),
    ]),
    first_name: schema.string(),
    last_name: schema.string(),
    password: schema.string([rules.required()]),
  });

  public messages: CustomMessages = {
    "phone_number.unique":
      "An account with the same phone number already exists",
  };
}
