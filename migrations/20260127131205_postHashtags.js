export const up = function (knex) {
  return knex.schema.createTable("post_hashtags", function (table) {
    table.uuid("id").primary();
    table.uuid("post_id").notNullable();
    table.uuid("hashtag_id").notNullable();
    table.string("hashtag", 35).notNullable();
    table.datetime("created_at").nullable();
    table.datetime("updated_at").nullable();

    table
      .foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("hashtag_id")
      .references("id")
      .inTable("hashtags")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_hashtags");
};
