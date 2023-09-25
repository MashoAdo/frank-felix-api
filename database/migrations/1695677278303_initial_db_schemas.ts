import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  public async up() {
    if (!(await this.schema.hasTable("user"))) {
      this.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table
          .string("phone_number", 20)
          .notNullable()
          .unsigned()
          .unique()
          .index();
        table.string("first_name", 255).notNullable();
        table.string("last_name", 255).notNullable();
        table.string("password_hash");
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("user_session"))) {
      this.schema.createTable("user_session", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable().references("id").inTable("user");
        table.string("session_token");
        table.string("user_agent").nullable();
        table.string("ip_address").nullable();
        table.dateTime("expires_at", { useTz: true });
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("product"))) {
      this.schema.createTable("product", (table) => {
        table.increments("id").primary();
        table.string("name").unique();
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("product_offer"))) {
      this.schema.createTable("product_offer", (table) => {
        table.increments("id").primary();
        table.double("sale_price").unsigned();
        table.integer("available_qty");
        table.integer("product_id").references("id").inTable("product");
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("inventory_trail"))) {
      this.schema.createTable("inventory_trail", (table) => {
        table.increments("id").primary();
        table
          .integer("product_offer_id")
          .references("product_offer")
          .inTable("product_offer");
        table.integer("qty").unsigned();
        table.enum("trail_direction", ["In,Out"]);
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("financial_trail"))) {
      this.schema.createTable("financial_trail", (table) => {
        table.increments("id").primary();
        table.double("amount").unsigned();
        table.integer("usd_rate").unsigned();
        table.enum("transaction_form", ["Cash", "Bank", "Mpesa"]);
        table.enum("trail_direction", ["In", "Out"]);
        table.timestamps();
      });
    }
  }
}
