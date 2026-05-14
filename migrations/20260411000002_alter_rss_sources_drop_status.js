exports.up = function (knex) {
  return knex.schema.table("rss_sources", function (table) {
    table.dropIndex([], "idx_rss_sources_status");
    table.dropColumn("status");
  });
};

exports.down = function (knex) {
  return knex.schema.table("rss_sources", function (table) {
    table
      .enum("status", ["pending", "approved", "rejected"])
      .notNullable()
      .defaultTo("pending");
    table.index("status", "idx_rss_sources_status");
  });
};
