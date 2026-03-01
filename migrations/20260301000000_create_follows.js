export const up = function (knex) {
  return knex.schema.createTable("follows", function (table) {
    table.uuid("id").primary();
    table
      .uuid("follower_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .uuid("following_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").notNullable();

    table.unique(["follower_id", "following_id"]);
    table.index("follower_id");
    table.index("following_id");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("follows");
};
