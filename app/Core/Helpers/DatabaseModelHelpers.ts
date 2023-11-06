import { DateTime } from "luxon";
import Constants from "../Constants/Constants";
import { DatabaseQueryBuilderContract } from "@ioc:Adonis/Lucid/Database";

export const __statusFilter = (query, column: string, status) => {
  if (status === "" || status === null || status === undefined) {
    return query;
  }

  return query.where(column, status);
};

export const __periodFilter = (
  query: DatabaseQueryBuilderContract,
  column: string,
  period: { start: string; end: string }
) => {
  if (!period) {
    return query;
  }

  const { start, end } = period;

  let formatted_start_date;
  let formatted_end_date;

  if (start) {
    DateTime.fromISO(start).toFormat(Constants.LUXON_SQL_FORMAT);
  }

  if (end) {
    DateTime.fromISO(end).toFormat(Constants.LUXON_SQL_FORMAT);
  }

  //If no end date ,filter everything from start date
  if (start && !end) {
    return query.where(column, ">=", formatted_start_date);
  } else if (!start && end) {
    //If no start date ,filter everything up to end date

    return query.where(column, "<=", formatted_end_date);
  } else {
    //Else in between
    return query.whereBetween(column, [
      formatted_start_date,
      formatted_end_date,
    ]);
  }
};
