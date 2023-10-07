import { SignUpInterface, TaskInterface } from "App/Types/Interfaces";
import Hash from "@ioc:Adonis/Core/Hash";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import AuthenticateTask from "./AuthenticateTask";

export default class SignUpTask implements TaskInterface {
  public async run(sign_up_info: SignUpInterface) {
    try {
      const phone_number_exists = await User.query()
        .where("phone_number", sign_up_info.phone_number)
        .first();

      if (phone_number_exists) {
        throw new Error(
          "Phone number already exists, Please use a different phone number"
        );
      }

      const password_hash = await Hash.make(sign_up_info.password);

      const user = await User.create({
        phone_number: sign_up_info.phone_number,
        first_name: sign_up_info.first_name,
        last_name: sign_up_info.last_name,
        password_hash: password_hash,
      });

      const session_token = await new AuthenticateTask().run(user.id);

      return { session_token, user };
    } catch (error) {
      // Log error to log services
      Logger.error("Error occurred during sign up:", error);

      // Rethrow the error to propagate it up the call stack
      throw error;
    }
  }
}
