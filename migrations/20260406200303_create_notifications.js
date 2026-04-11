export const up = function (knex) {
  return knex.schema
    .createTable("notifications", function (table) {
      table.uuid("id").primary();
      table
        .enum("type", ["Like", "Reshare", "Follow", "Reply", "Mention"])
        .notNullable();
      table
        .uuid("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .uuid("post_id")
        .nullable()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .uuid("reply_id")
        .nullable()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("count").unsigned().notNullable().defaultTo(1);
      table.boolean("is_read").notNullable().defaultTo(false);
      table.timestamps();
      table.index(["user_id"], "notifications_user_id_idx");
      table.index(["post_id"], "notifications_post_id_idx");
    })
    .createTable("notifications_triggers", function (table) {
      table.uuid("id").primary();
      table
        .uuid("notification_id")
        .notNullable()
        .references("id")
        .inTable("notifications")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .uuid("trigger_user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps();
      table.index(
        ["notification_id"],
        "notifications_triggers_notification_id_idx",
      );
      table.index(
        ["trigger_user_id"],
        "notifications_triggers_trigger_user_id_idx",
      );
    });
};

export const down = function (knex) {
  return knex.schema
    .dropTableIfExists("notifications_triggers")
    .dropTableIfExists("notifications");
};
