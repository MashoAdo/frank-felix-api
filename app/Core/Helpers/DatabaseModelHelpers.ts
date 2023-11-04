import { DateTime } from "luxon";
import Constants from "../Constants/Constants";

export const __statusFilter = (query, column: string, status) => {
  if (status === "" || status === null || status === undefined) {
    return query;
  }

  return query.where(column, status);
};

export const __periodFilter = (
  query,
  column: string,
  period: { start: string; end: string }
) => {
  if (!period) {
    return query;
  }

  const { start, end } = period;

  //If no end date ,filter everything from start date
  if (start && !end) {
    return query.where(
      column,
      ">=",
      DateTime.fromISO(start).toFormat(Constants.LUXON_SQL_FORMAT)
    );
  } else if (!start && end) {
    //If no start date ,filter everything up to end date

    return query.where(
      column,
      "<=",
      DateTime.fromISO(end).toFormat(Constants.LUXON_SQL_FORMAT)
    );
  } else {
    //Else in between
    return query.whereBetween(column, [
      DateTime.fromISO(start).toFormat(Constants.LUXON_SQL_FORMAT),
      DateTime.fromISO(end).toFormat(Constants.LUXON_SQL_FORMAT),
    ]);
  }
};
