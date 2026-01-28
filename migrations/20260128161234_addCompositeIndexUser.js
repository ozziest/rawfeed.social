export function up(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.index(["bot_type", "created_at"], "idx_bot_type_created_at");
  });
}

export function down(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropIndex(["bot_type", "created_at"], "idx_bot_type_created_at");
  });
}
