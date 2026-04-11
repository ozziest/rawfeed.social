export const up = function (knex) {
  return knex.schema.alterTable("notifications", function (table) {
    table.index(
      ["user_id", "type", "created_at"],
      "notifications_user_type_created_idx",
    );
    table.index(["user_id", "updated_at"], "notifications_user_updated_idx");
    table.index(["user_id", "is_read"], "notifications_user_is_read_idx");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("notifications", function (table) {
    table.dropIndex(
      ["user_id", "type", "created_at"],
      "notifications_user_type_created_idx",
    );
    table.dropIndex(
      ["user_id", "updated_at"],
      "notifications_user_updated_idx",
    );
    table.dropIndex(["user_id", "is_read"], "notifications_user_is_read_idx");
  });
};
