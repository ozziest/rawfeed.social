exports.up = function (knex) {
  return knex.schema.createTable("rss_sources", function (table) {
    table.uuid("id").primary();
    table.uuid("submitted_by").notNullable();
    table.uuid("bot_user_id").nullable();
    table.string("url", 768).notNullable().unique();
    table.string("name", 255).notNullable();
    table.text("bio").nullable();
    table.string("category", 50).nullable();
    table.string("language", 10).notNullable().defaultTo("en");
    table.string("update_frequency", 100).notNullable().defaultTo("0 * * * *");
    table
      .enum("status", ["pending", "approved", "rejected"])
      .notNullable()
      .defaultTo("pending");
    table.timestamps(true, true);

    table.foreign("submitted_by").references("users.id");
    table.foreign("bot_user_id").references("users.id");
    table.index("status", "idx_rss_sources_status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rss_sources");
};
