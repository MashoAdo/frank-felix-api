import HttpContext from "@ioc:Adonis/Core/HttpContext";

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
