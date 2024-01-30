import { Exception } from "@adonisjs/core/build/standalone";
import { __trans } from "App/Core/Helpers/TransHelper";

export default class AppException extends Exception {
  private static readonly lookup = {
    500: 500,
    503: 503,
  };

  public innerException;
  public code;

  private constructor(code: number, args?: any, innerException?: Error) {
    const message = __trans(`api-errors.${code}`, args);
    const status = AppException.lookup[code] ?? 417;
    super(message, status, "E_APP_EXCEPTION");

    this.code = code;
    this.innerException = innerException;
  }

  public static fromCode(code: number, args?: any, innerException?: any) {
    return new AppException(code, args, innerException);
  }
}
