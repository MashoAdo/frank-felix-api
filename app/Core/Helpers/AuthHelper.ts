import HttpContext from "@ioc:Adonis/Core/HttpContext";
import UserSession from "App/Models/UserSession";

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
    throw new Error("No session cookie found in http request");
  }

  const user_session = await UserSession.query()
    .where("session_token", cookie)
    .select(["user_id", "session_token", "expires_at"])
    .first();

  if (!user_session) {
    throw new Error("User session does not exists");
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
