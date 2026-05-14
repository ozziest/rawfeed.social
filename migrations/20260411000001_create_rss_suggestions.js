exports.up = function (knex) {
  return knex.schema.createTable("rss_suggestions", function (table) {
    table.uuid("id").primary();
    table.uuid("submitted_by").notNullable();
    table.string("url", 768).notNullable();
    table.string("language", 10).notNullable().defaultTo("en");
    table.boolean("is_owner").notNullable().defaultTo(false);
    table
      .enum("status", ["pending", "accepted", "rejected"])
      .notNullable()
      .defaultTo("pending");
    table.string("rejection_reason", 255).nullable();
    table.text("admin_notes").nullable();
    table.timestamps(true, true);

    table.foreign("submitted_by").references("users.id");
    table.index("status", "idx_rss_suggestions_status");
    table.index("submitted_by", "idx_rss_suggestions_submitted_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rss_suggestions");
};
