export const up = function (knex) {
  return knex.schema.alterTable("posts", (table) => {
    table.string("location", 2).notNullable().defaultTo("en");
    table.index("location", "idx_posts_location");
    table.index(["location", "created_at"], "idx_posts_location_created");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("posts", (table) => {
    table.dropIndex("location", "idx_posts_location");
    table.dropIndex(["location", "created_at"], "idx_posts_location_created");
    table.dropColumn("location");
  });
};
