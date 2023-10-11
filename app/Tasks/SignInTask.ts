import { ISignIn, TaskInterface } from "App/Types/Interfaces";
import AuthenticateTask from "./AuthenticateTask";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class SignInTask implements TaskInterface {
  public async run(signInPayload: ISignIn) {
    const { phone_number, password } = signInPayload;

    const user = await User.query()
      .where("phone_number", phone_number)
      .select("id", "first_name", "last_name", "password_hash", "phone_number")
      .first();

    if (!user) {
      //TODO: handle from code exceptions -> Masho Ado

      throw new Error("No user with such record exist");
    }

    if (!(await Hash.verify(user.password_hash, password))) {
      //handle password don't match
      throw new Error("Incorrect password please enter the correct password");
    }
    const session_token = await new AuthenticateTask().run(user.id);

    return { session_token, user };
  }
}
