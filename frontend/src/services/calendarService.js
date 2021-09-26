import server from "../utils/server";

export const getMemoriesByDate = async (selectedDate) => {
  try {
    const year = selectedDate.getUTCFullYear();
    const month = selectedDate.getMonth() + 1; // Because javascript getMonth starts from 0
    const day = selectedDate.getDate();
    const res = await server.get(`/memories/${year}/${month}/${day}`)
    return res.data.memories
  } catch (err) {
    throw err;
  }
}
