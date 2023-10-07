import Constants from "App/Core/Constants/Constants";
import { DateTime } from "luxon";
import Encryption from "@ioc:Adonis/Core/Encryption";
import { TaskInterface } from "App/Types/Interfaces";
import GenerateTokenTask from "./GenerateTokenTask";
import UserSession from "App/Models/UserSession";
import { __getClientInfo } from "App/Core/Helpers/AuthHelper";

export default class AuthenticateTask implements TaskInterface {
  public async run(user_id: number) {
    const token = await new GenerateTokenTask().run();

    const clientInfo = __getClientInfo();

    const encrypted_token = Encryption.encrypt(token);

    await UserSession.create({
      user_id: user_id,
      session_token: encrypted_token,
      expires_at: DateTime.now().plus({
        minutes: Constants.SESSION_LIFETIME,
      }),
      user_agent: clientInfo?.user_agent,
      ip_address: clientInfo?.ip_address,
    });

    return encrypted_token;
  }
}
