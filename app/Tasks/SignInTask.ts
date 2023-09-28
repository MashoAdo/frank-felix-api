import { SignInInterface, TaskInterface } from "App/Types/Interfaces";
import AuthenticateTask from "./AuthenticateTask";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class SignInTask implements TaskInterface {
  public async run(signInPayload: SignInInterface) {
    const { phone_number, password } = signInPayload;

    const user = await User.query()
      .where("phone_number", phone_number)
      .select("password_hash", "name", "email", "phone_number", "id")
      .first();

    if (!user) {
      //TODO: handle from code exceptions -> Masho Ado

      throw new Error("No user with such record exist");
    }

    if (!(await Hash.verify(user.password_hash, password))) {
      //handle password don't match
    }
    const token = await new AuthenticateTask().run(user);

    return {
      user,
      token,
    };
  }
}
