export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table
      .enum("notif_email_freq", ["off", "hourly", "daily", "weekly"])
      .notNullable()
      .defaultTo("daily")
      .after("updated_at");
    table
      .datetime("notif_email_last_sent_at")
      .nullable()
      .after("notif_email_freq");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("notif_email_freq");
    table.dropColumn("notif_email_last_sent_at");
  });
};
