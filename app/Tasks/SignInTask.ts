import { ISignInPayload, IUser, TaskInterface } from "App/Types/Interfaces";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import { HttpContext } from "@adonisjs/core/build/standalone";
import Constants from "App/Core/Constants/Constants";
import CreateUserSessionTask from "./CreateUserSessionTask";

export default class SignInTask implements TaskInterface {
  public async run(signInPayload: ISignInPayload) {
    const user = await this.verifyUser(signInPayload);

    const session_token = await new CreateUserSessionTask().run(user.id);

    this.setSessionCookie(session_token);

    return user;
  }

  private async verifyUser(signInPayload: ISignInPayload): Promise<IUser> {
    const { phone_number, password } = signInPayload;

    const user = await User.query()
      .where("phone_number", phone_number)
      .select("id", "first_name", "last_name", "password_hash", "phone_number")
      .first();

    if (!user) {
      //TODO: handle from code exceptions -> Masho Ado

      throw new Error("No user with such record exist");
    }

    const isPasswordCorrect = await Hash.verify(user.password_hash, password);

    if (!isPasswordCorrect) {
      //handle password don't match
      throw new Error("Incorrect password please enter the correct password");
    }

    return user;
  }

  private setSessionCookie(session_token: string) {
    const ctx = HttpContext.getOrFail();

    ctx.response.cookie("session", session_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: Constants.SESSION_LIFETIME,
      path: "/",
      // domain: "frankfelix.com",//TODO: add domain URL
    });
  }
}
