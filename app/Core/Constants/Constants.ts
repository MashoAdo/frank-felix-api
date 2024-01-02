export default class Constants {
  public static readonly SESSION_LIFETIME = 60 * 60 * 24 * 30; // Month in seconds
  public static readonly SESSION_EXPIRY_EXTEND_MINUTES = 60 * 60 * 24; // Day in seconds

  public static readonly LUXON_SQL_FORMAT = "yyyy-LL-dd HH:mm:ss";
  public static readonly LUXON_DISPLAY_DATE_FORMAT = "yyyy-LL-dd";

  public static readonly PAGE_LIMIT = 20;
}
