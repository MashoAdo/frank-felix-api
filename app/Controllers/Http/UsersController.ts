import Constants from "App/Core/Constants/Constants";
import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import SignInTask from "App/Tasks/SignInTask";
import SignOutTask from "App/Tasks/SignOutTask";
import SignUpTask from "App/Tasks/SignUpTask";
import SignInValidator from "App/Validators/SignInValidator";
import SignUpValidator from "App/Validators/SignUpValidator";

export default class UsersController {
  public async signIn({ request }) {
    const payload = await request.validate(SignInValidator);

    return {
      success: true,
      success_code: SuccessCodes.SIGN_IN,
      success_message: "You have successfully logged in",
      data: await new SignInTask().run(payload),
    };
  }

  public async signUp({ request, response }) {
    const payload = await request.validate(SignUpValidator);

    const { session_token, user } = await new SignUpTask().run(payload);

    response.cookie("session", session_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: Constants.SESSION_LIFETIME,
      path: "/",
    });

    return {
      success: true,
      success_code: SuccessCodes.SIGN_UP,
      success_message: "You have successfully been signed up",
      data: user,
    };
  }

  public async signOut() {
    await new SignOutTask().run();

    return {
      success: true,
      success_code: SuccessCodes.SIGN_OUT,
      success_message: "You have successfully been signed out",
    };
  }
}
