const pool = require("../db/db");
const camelizeKeys = require("../db/utils");
const logger = require("../logs/logger");
const { BadRequestError } = require("../errors/errors");

class LineService {
  constructor() {}

  async createLine(userId, name, colorHex) {
    try {
      const newLine = await pool.query(
        "INSERT INTO lines (user_id, name, color_hex, last_updated_date) VALUES ($1, $2, $3, NOW()) RETURNING *",
        [userId, name, colorHex]
      );
      return camelizeKeys(newLine.rows[0]);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw new BadRequestError("A line with the same name already exists");
    }
  }

  async getLineByLineId(userId, lineId) {
    try {
      const lines = await pool.query(
        "SELECT * FROM lines WHERE line_id = $1 AND user_id = $2",
        [lineId, userId]
      );
      return camelizeKeys(lines.rows[0]);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw err;
    }
  }

  async getAllLinesByUserId(userId) {
    try {
      const lines = await pool.query("SELECT * FROM lines WHERE user_id = $1", [
        userId,
      ]);
      return camelizeKeys(lines.rows);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw err;
    }
  }

  async getLineByLineIdWithMemoriesOrderByCreationDate(userId, lineId) {
    try {
      const lineWithMemories = await pool.query(
        `SELECT L.*, M.memory_id, M.title, M.description, M.creation_date, M.latitude, M.longitude, (
          SELECT url FROM media WHERE memory_id = M.memory_id ORDER BY position LIMIT 1
        ) AS thumbnail_url
        FROM lines L LEFT JOIN memories M ON L.line_id = M.line_id
        WHERE L.line_id = $1 AND L.user_id = $2 ORDER BY M.creation_date DESC`,
        [lineId, userId]
      );
      return camelizeKeys(lineWithMemories.rows);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw err;
    }
  }

  async getAllLinesByUserIdWithLatestMemoryOrderByMostRecentChange(userId) {
    try {
      const lines = await pool.query(
        `SELECT L.*, M.memory_id, M.title AS memory_title, M.description AS memory_description,
        M.creation_date AS memory_creation_date, M.latitude AS memory_latitude, M.longitude AS memory_longitude, (
          SELECT url FROM media WHERE memory_id = M.memory_id ORDER BY position LIMIT 1
        ) AS thumbnail_url
        FROM lines L LEFT JOIN memories M ON L.line_id = M.line_id
        WHERE L.user_id = $1 AND (
          M.creation_date IS NULL OR M.creation_date = (
            SELECT MAX(creation_date) FROM memories WHERE line_id = M.line_id
          )
        ) ORDER BY L.last_updated_date DESC`,
        [userId]
      );
      return camelizeKeys(lines.rows);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw err;
    }
  }

  async updateLineByLineId(lineId, userId, name, colorHex) {
    try {
      const updatedLine = await pool.query(
        `UPDATE lines SET name = COALESCE($1, name), color_hex = COALESCE($2, color_hex) 
        WHERE line_id = $3 AND user_id = $4 RETURNING *`,
        [name, colorHex, lineId, userId]
      );
      return camelizeKeys(updatedLine.rows[0]);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw new BadRequestError("A line with the same name already exists");
    }
  }

  async deleteLineByLineId(lineId, userId) {
    try {
      const deletedLine = await pool.query(
        "DELETE FROM lines WHERE line_id = $1 AND user_id = $2 RETURNING *",
        [lineId, userId]
      );
      return camelizeKeys(deletedLine.rows[0]);
    } catch (err) {
      logger.logErrorWithoutRequest(err);
      throw err;
    }
  }
}

module.exports = LineService;
