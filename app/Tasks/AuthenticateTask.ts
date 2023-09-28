import Constants from "App/Core/Constants/Constants";
import { DateTime } from "luxon";
import Encryption from "@ioc:Adonis/Core/Encryption";
import { TaskInterface } from "App/Types/Interfaces";
import GenerateTokenTask from "./GenerateTokenTask";
import UserSession from "App/Models/UserSession";
import { __getClientInfo } from "App/Core/Helpers/AuthHelper";
import { HttpContext } from "@adonisjs/core/build/standalone";

export default class AuthenticateTask implements TaskInterface {
  public async run(user) {
    const token = await new GenerateTokenTask().run();

    const clientInfo = __getClientInfo();

    await UserSession.create({
      user_id: user.id,
      session_token: token,
      expires_at: DateTime.now().plus({
        minutes: Constants.SESSION_LIFETIME,
      }),
      user_agent: clientInfo?.user_agent,
      ip_address: clientInfo?.ip_address,
    });

    const encrypt_token = Encryption.encrypt(token);

    // Set the cookie in the response
    const ctx = HttpContext.get();

    if (ctx) {
      ctx.response.cookie("session", encrypt_token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: Constants.SESSION_LIFETIME,
        path: "/",
        // domain: "example.com",//TODO: add domain URL
      });
    }

    return encrypt_token;
  }
}
