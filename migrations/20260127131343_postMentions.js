export const up = function (knex) {
  return knex.schema.createTable("post_mentions", function (table) {
    table.uuid("id").primary();
    table.uuid("post_id").notNullable();
    table.uuid("user_id").nullable();
    table.string("username", 30).notNullable();
    table.datetime("created_at").nullable();
    table.datetime("updated_at").nullable();

    table
      .foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .onUpdate("SET NULL");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_mentions");
};
