export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.index("created_at", "idx_users_created_at");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropIndex("created_at", "idx_users_created_at");
  });
};
