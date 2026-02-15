import { v4 as uuidv4 } from "uuid";
import { getKnex } from "../db/connection";
import { DataExports } from "../types/database";
import { Selectable } from "kysely";
import { loggerAll } from "../helpers/common";

const TABLE_NAME = "data_exports";

type ExportStatus = "pending" | "processing" | "completed" | "failed";

interface CreateExportInput {
  userId: string;
}

interface UpdateExportInput {
  status?: ExportStatus;
  completed_at?: Date;
  expires_at?: Date;
  s3_key?: string;
  file_size?: number;
  error_message?: string;
}

const create = async (input: CreateExportInput): Promise<string> => {
  const id = uuidv4();
  await getKnex().table(TABLE_NAME).insert({
    id,
    user_id: input.userId,
    status: "pending",
    requested_at: new Date(),
  });
  return id;
};

const getById = async (
  id: string,
): Promise<Selectable<DataExports> | undefined> => {
  return await getKnex().table(TABLE_NAME).where("id", id).first();
};

const getByUserId = async (
  userId: string,
  limit: number = 10,
): Promise<Selectable<DataExports>[]> => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("requested_at", "desc")
    .limit(limit);
};

const getLatestByUserId = async (
  userId: string,
): Promise<Selectable<DataExports> | undefined> => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("user_id", userId)
    .orderBy("requested_at", "desc")
    .first();
};

const canUserRequestExport = async (userId: string): Promise<boolean> => {
  const latest = await getLatestByUserId(userId);
  if (!latest) return true;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return new Date(latest.requested_at!) < oneWeekAgo;
};

const update = async (id: string, input: UpdateExportInput): Promise<void> => {
  await getKnex().table(TABLE_NAME).where("id", id).update(input);
};

const getPendingExports = async (): Promise<Selectable<DataExports>[]> => {
  return await getKnex()
    .table(TABLE_NAME)
    .where("status", "pending")
    .orderBy("requested_at", "asc");
};

const isExportValid = (exportRecord: Selectable<DataExports>): boolean => {
  if (exportRecord.status !== "completed") return false;
  if (!exportRecord.expires_at) return false;
  return new Date(exportRecord.expires_at) > new Date();
};

export default loggerAll(
  {
    create,
    getById,
    getByUserId,
    getLatestByUserId,
    canUserRequestExport,
    update,
    getPendingExports,
    isExportValid,
  },
  "dataExport.service",
);
