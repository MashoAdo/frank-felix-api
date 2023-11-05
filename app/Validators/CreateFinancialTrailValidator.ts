import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateFinancialTrailValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    amount: schema.number([rules.required(), rules.unsigned()]),
    usd_rate: schema.number.optional(),
    trail_type: schema.enum(["Cash", "Bank", "Mpesa"], [rules.required()]),
    trail_direction: schema.enum(["In", "Out"], [rules.required()]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "amount.number.required": "Please add the amount",
    "amount.number.unsigned": "The amount should be a positive number",
    "trail_type.required":
      "Please select the type of transaction from these choices Cash,Bank or Mpesa",
    "trail_direction.required":
      "Please select the direction of the transaction from theses choices In or Out",
  };
}
