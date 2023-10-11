import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  public async up() {
    if (!(await this.schema.hasTable("user"))) {
      this.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table
          .integer("phone_number", 20)
          .notNullable()
          .unsigned()
          .unique()
          .index();
        table.string("first_name", 255).notNullable();
        table.string("last_name", 255).notNullable();
        table.string("password_hash").notNullable();
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("user_session"))) {
      this.schema.createTable("user_session", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable().references("id").inTable("user");
        table.string("session_token").notNullable();
        table.string("user_agent").nullable();
        table.string("ip_address").nullable();
        table.dateTime("expires_at", { useTz: true });
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("product"))) {
      this.schema.createTable("product", (table) => {
        table.increments("id").primary();
        table.string("name").unique().notNullable();
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("product_offer"))) {
      this.schema.createTable("product_offer", (table) => {
        table.increments("id").primary();
        table.double("sale_price").unsigned().notNullable();
        table.integer("available_qty").notNullable();
        table
          .integer("color_id")
          .notNullable()
          .references("id")
          .inTable("product_color");
        table.string("image_url").nullable();
        table.integer("product_id").references("id").inTable("product");
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("inventory_trail"))) {
      this.schema.createTable("inventory_trail", (table) => {
        table.increments("id").primary();
        table
          .integer("product_offer_id")
          .references("id")
          .inTable("product_offer")
          .notNullable();
        table.integer("qty").unsigned().notNullable();
        table.enum("trail_direction", ["In,Out"]);
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("financial_trail"))) {
      this.schema.createTable("financial_trail", (table) => {
        table.increments("id").primary();
        table.double("amount").unsigned().notNullable();
        table
          .integer("usd_rate")
          .unsigned()
          .comment(
            "this is the rate at which the usd was traded at, This value will not necessarily match the usd_rate from the bank"
          );
        table.enum("transaction_form", ["Cash", "Bank", "Mpesa"]).notNullable();
        table.enum("trail_direction", ["In", "Out"]).notNullable();
        table.timestamps();
      });
    }

    if (!(await this.schema.hasTable("product_color"))) {
      this.schema.createTable("product_color", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.timestamps();
      });
    }
  }
}
