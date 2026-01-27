export const up = function (knex) {
  return knex.schema.createTable("post_links", function (table) {
    table.uuid("id").primary();
    table.uuid("post_id").notNullable();
    table.uuid("link_id").notNullable();
    table.datetime("created_at").nullable();
    table.datetime("updated_at").nullable();

    table
      .foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("link_id")
      .references("id")
      .inTable("links")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_links");
};
