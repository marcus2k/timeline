import server from "../utils/server";
import {
  addHash,
  removeHash
} from "./colors";

export const getAllLinesByUserIdOrderByMostRecentMemory = async () => {
  const res = await server.get('/lines');
  let lines = res.data.lines;
  if (lines.length !== 0) {
    lines = lines.map(line => {
      return {
        ...line,
        'colorHex': addHash(line["colorHex"]),
      }
    });
  }
  return lines;
}

export const createNewLine = async (lineTitle, selectedColor) => {
  const body = {
    "lineName": lineTitle,
    "colorHex": removeHash(selectedColor),
  }
  const res = await server.post('lines', body);
  return res.data.line;
}

export const editLineById = async (lineId, lineTitle, selectedColor) => {
  const body = {
    "lineName": lineTitle.trim(),
    "colorHex": removeHash(selectedColor),
  }
  const res = await server.patch(`lines/${lineId}`, body);
  return res.lines;
}

export const deleteLineById = async (lineId) => {
  const res = await server.delete(`lines/${lineId}`);
  return res.data.line
}

const convertCoordinatesToFloat = (memories) => {
  return memories.map(memory => {
    return {
      ...memory,
      latitude: parseFloat(memory.latitude),
      longitude: parseFloat(memory.longitude),
    }
  })
}

export const getLineDataById = async (lineId) => {
  const res = await server.get(`/lines/${lineId}?includeMemories=true`);
  let line = res.data.line;
  line["colorHex"] = addHash(line["colorHex"]);
  return {
    ...line,
    memories: convertCoordinatesToFloat(line.memories)
  };
}
