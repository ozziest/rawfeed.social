export const up = function (knex) {
  return knex.schema.createTable("links", function (table) {
    table.uuid("id").primary();
    table.string("code", 30).notNullable().unique();
    table.string("link", 400).notNullable();
    table.datetime("created_at").nullable();
    table.datetime("updated_at").nullable();
    table.bigInteger("count").notNullable().defaultTo(0);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("links");
};
