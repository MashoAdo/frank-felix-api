import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Constants from "App/Core/Constants/Constants";
import { __getAuthSession } from "App/Core/Helpers/AuthHelper";
import UserSession from "App/Models/UserSession";
import Logger from "@ioc:Adonis/Core/Logger";
import { DateTime } from "luxon";

export default class SessionAuth {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    // Auth session verifies user session exists or throws a 401
    try {
      const user_session = await __getAuthSession();

      const remaining_minutes = user_session?.expires_at
        .diffNow()
        .as("minutes")!;

      if (remaining_minutes < Constants.SESSION_EXPIRY_EXTEND_MINUTES) {
        UserSession.query().update({
          expires_at: DateTime.now().plus({
            minutes: Constants.SESSION_LIFETIME,
          }),
        });
      }
      await next();
    } catch (error) {
      Logger.info(error);
      throw new Error(error.message);
    }
  }
}
