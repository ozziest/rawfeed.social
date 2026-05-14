exports.up = async function (knex) {
  return knex.schema.alterTable("notifications_triggers", (table) => {
    table.unique(["notification_id", "trigger_user_id"], {
      indexName: "uq_notification_trigger_user",
    });
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("notifications_triggers", (table) => {
    table.dropUnique(
      ["notification_id", "trigger_user_id"],
      "uq_notification_trigger_user",
    );
  });
};
