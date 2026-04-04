export const up = function (knex) {
  return knex.schema.createTable("post_likes", function (table) {
    table.uuid("id").primary();
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table
      .uuid("post_id")
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.timestamps();

    table.index(["post_id", "user_id"], "idx_post_id_user_id");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_likes");
};
