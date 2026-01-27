export const up = function (knex) {
  return knex.schema.createTable("hashtags", function (table) {
    table.uuid("id").primary();
    table.string("hashtag", 35).notNullable().unique();
    table.datetime("created_at").nullable();
    table.datetime("updated_at").nullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("hashtags");
};
