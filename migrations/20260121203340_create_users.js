export const up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary();
    table.string("email").notNullable().unique().index();
    table.string("username").notNullable().unique().index();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.text("bio").nullable();
    table.timestamps();
    table.datetime("deleted_at").nullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
