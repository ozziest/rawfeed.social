export const up = function (knex) {
  return knex.schema.alterTable("posts", function (table) {
    table.string("external_id", 255).nullable();
    table.index(["external_id"], "idx_posts_external_id");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("posts", function (table) {
    table.dropIndex(["external_id"], "idx_posts_external_id");
    table.dropColumn("external_id");
  });
};
