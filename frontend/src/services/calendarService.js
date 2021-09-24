import server from "../utils/server";

export const getMemoriesByDate = async (selectedDate) => {
  try {
    console.log(selectedDate)
    const year = selectedDate.getUTCFullYear();
    const month = selectedDate.getUTCMonth();
    const day = selectedDate.getUTCDate();
    const res = await server.get(`/memories/${year}/${month}/${day}`)
    return res.data.memories
  } catch (err) {
    throw err;
  }
}
