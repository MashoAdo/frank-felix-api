import HttpContext from "@ioc:Adonis/Core/HttpContext";
import UserSession from "App/Models/UserSession";
import { DateTime } from "luxon";
import Constants from "../Constants/Constants";

export const __getClientInfo = (ctx?: any) => {
  ctx = ctx || HttpContext.get();

  if (ctx) {
    return {
      user_agent: ctx.request.header("user-agent"),
      ip_address: ctx.request.ip(),
    };
  }

  return null;
};

export const __getAuthSession = async () => {
  const ctx = HttpContext.get();

  const cookie = ctx?.request.cookie("session");

  if (!cookie) {
    throw new Error("Unauthorized access");
  }

  const user_session = UserSession.query()
    .where("session_token", cookie)
    .where(
      "expires_at",
      ">",
      DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT)
    )
    .select(["user_id", "session_token", "expires_at"])
    .first();

  if (!user_session) {
    throw new Error("Unauthorized access");
  }

  return user_session;
};

export const __setCurrentUser = (app_session) => {
  const ctx = HttpContext.get();

  if (ctx) {
    ctx["user_id"] = app_session.user_id;

    //   TODO: Sentry user scope
    //   Sentry.setUser({
    //     id: entity.id,
    //     name: entity.name,
    //     ip_address: "{{auto}}",
    //     entity_type: app_session.entity_type,
    //   });
  }
};
