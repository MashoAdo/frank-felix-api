import Constants from "App/Core/Constants/Constants";
import { DateTime } from "luxon";
import Encryption from "@ioc:Adonis/Core/Encryption";
import { TaskInterface } from "App/Types/Interfaces";
import GenerateTokenTask from "./GenerateTokenTask";
import { __getClientInfo } from "App/Core/Helpers/__getClientInfo";
import UserSession from "App/Models/UserSession";

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

    return Encryption.encrypt(token);
  }
}
