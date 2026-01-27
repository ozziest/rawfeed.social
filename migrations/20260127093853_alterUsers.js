export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.enum("bot_type", ["rss", "system"]).nullable().defaultTo(null);

    table.index(["bot_type"], "idx_users_bot_type");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropIndex(["bot_type"], "idx_users_bot_type");
    table.dropColumn("bot_type");
  });
};
