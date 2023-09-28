import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import SignInTask from "App/Tasks/SignInTask";
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

  public async signUp({ request }) {
    const payload = await request.validate(SignUpValidator);

    return {
      success: true,
      success_code: SuccessCodes.SIGN_UP,
      success_message: "You have successfully been signed up",
      data: await new SignUpTask().run(payload),
    };
  }
}
