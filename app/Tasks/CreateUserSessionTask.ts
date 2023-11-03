import Constants from "App/Core/Constants/Constants";
import { DateTime } from "luxon";
import Encryption from "@ioc:Adonis/Core/Encryption";
import { TaskInterface } from "App/Types/Interfaces";
import GenerateTokenTask from "./GenerateTokenTask";
import UserSession from "App/Models/UserSession";
import { __getClientInfo } from "App/Core/Helpers/AuthHelper";
import Logger from "@ioc:Adonis/Core/Logger";

export default class CreateUserSessionTask implements TaskInterface {
  public async run(user_id: number) {
    const token = await new GenerateTokenTask().run();

    const clientInfo = __getClientInfo();

    const encrypted_token = Encryption.encrypt(token);

    try {
      await UserSession.create({
        user_id: user_id,
        session_token: encrypted_token,
        expires_at: DateTime.now().plus({
          minutes: Constants.SESSION_LIFETIME,
        }),
        user_agent: clientInfo?.user_agent,
        ip_address: clientInfo?.ip_address,
      });
    } catch (error) {
      Logger.error("Failed to create user session", error);
    }

    return encrypted_token;
  }
}
