export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("link", 2048).nullable().after("bio");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("link");
  });
};
