import { HttpContext } from "@adonisjs/core/build/standalone";
import UserSession from "App/Models/UserSession";
import { TaskInterface } from "App/Types/Interfaces";
import { DateTime } from "luxon";

export default class SignOutTask implements TaskInterface {
  public async run(): Promise<void> {
    const session_token = this.flushRequestSessionCookie();

    await this.expireSession(session_token);

    return;
  }

  private flushRequestSessionCookie() {
    const ctx = HttpContext.get();

    const session_token = ctx?.request.cookie("session");

    if (!session_token) {
      throw new Error("No session token found in request");
    }

    ctx?.response.clearCookie("session");

    return session_token;
  }

  private async expireSession(session_token: string) {
    try {
      const current_session = await UserSession.query()
        .where("session_token", session_token)
        .firstOrFail();

      const now = DateTime.now();
      current_session.expires_at = now;

      await current_session.save();

      return;
    } catch (error) {
      // Handle errors such as database issues or missing session token
      throw new Error("Error expiring the session: " + error.message);
    }
  }
}
