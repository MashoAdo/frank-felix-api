import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateFinancialTrailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number.optional([rules.unsigned()]),
    usd_rate: schema.number.optional(),
    trail_type: schema.enum.optional(["Cash", "Bank", "Mpesa"]),
    trail_direction: schema.enum.optional(["In", "Out"]),
  });

  public messages: CustomMessages = {
    "amount.unsigned": "The amount must be a positive number",
    "usd_rate.number": "The USD rate must be a number",
    "trail_type.enum":
      "Please select the type of transaction from these choices: Cash, Bank, or Mpesa",
    "trail_direction.enum":
      "Please select the direction of the transaction from these choices: In or Out",
  };
}
