import {
  COLORS
} from "../utils/colors";
import server from "../utils/server";
import {
  addHash,
  removeHash
} from "./colors";

const mockLineData = {
  lineId: 1,
  memoryIds: [1, 2, 3],
  title: "Mok Family",
  color: COLORS.GREEN,
}

export const getAllLinesByUserIdOrderByMostRecentMemory = async () => {
  const res = await server.get('/lines');
  let lines = res.data.lines;
  if (lines.length !== 0) {
    lines = lines.map(line => {
      return {
        ...line,
        'colorHex': addHash(line["colorHex"]),
        // TODO: remove once backend is fixed to camelCase
        lineId: line.lineId ? line.lineId : line.line_id
      }
    });
    console.log(lines);
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

// TODO: update request endpoint after backend created the endpoint
export const editLineById = async (lineId, lineTitle, selectedColor) => {
  const body = {
    "lineName": lineTitle.trim(),
    "colorHex": removeHash(selectedColor),
  }
  const res = await server.patch(`lines/${lineId}`, body);
  return res.lines;
}

// TODO: connect to backend after delete by id route is created
export const deleteLineById = async (lineId) => {
  const res = await server.delete(`lines/${lineId}`);
  return res.data.line
}

// returns line data
// remember to add a hash to the color
// rememebr to change to async
export const getLineById = (id) => {
  return mockLineData
}

// this one for now does not return the memories of the line yet
export const getLineDataById = async (lineId) => {
  const res = await server.get(`/lines/${lineId}`);
  let line = res.data.line;
  line["colorHex"] = addHash(line["colorHex"]);
  return line;
}
