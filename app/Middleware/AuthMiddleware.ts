import Constants from "App/Core/Constants/Constants";
import { __getAuthSession } from "App/Core/Helpers/AuthHelper";
import UserSession from "App/Models/UserSession";

export default class AuthMiddleware {
  public async handle(next: () => Promise<void>) {
    const user_session = await __getAuthSession();

    const remaining_minutes = user_session?.expires_at.diffNow().as("minutes")!;

    if (remaining_minutes < Constants.SESSION_EXPIRY_EXTEND_MINUTES) {
      UserSession.query().update({ expires_at: Constants.SESSION_LIFETIME });
    }

    next();
  }
}
