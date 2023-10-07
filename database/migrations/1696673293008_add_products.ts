import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import Constants from "App/Core/Constants/Constants";
import { DateTime } from "luxon";

export default class extends BaseSchema {
  public async up() {
    if (await this.schema.hasTable("product")) {
      this.defer(async (db) => {
        await db.table("product").multiInsert([
          {
            name: "T25C2615",
            created_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
            updated_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
          },
          {
            name: "T26W3110",
            created_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
            updated_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
          },
          {
            name: "SUPERIOR GOLD",
            created_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
            updated_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
          },
          {
            name: "T25CMAXI",
            created_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
            updated_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
          },
          {
            name: "KIDS POLO",
            created_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
            updated_at: DateTime.now().toFormat(Constants.LUXON_SQL_FORMAT),
          },
        ]);
      });
    }
  }
}
