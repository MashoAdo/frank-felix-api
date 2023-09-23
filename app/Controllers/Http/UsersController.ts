import { SuccessCodes } from "App/Core/Constants/SuccesCodes";
import SignInValidator from "App/Validators/SignInValidator";

export default class UsersController {
  public async signIn({ request }) {
    const payload = await request.validate(SignInValidator);
    console.log("User controller hit", payload);

    return {
      success: true,
      success_code: SuccessCodes.SIGN_IN,
      success_message: "You have successfully logged in",
      data: payload,
    };
  }
}
