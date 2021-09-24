// import server from "../utils/server"

const mockMemoryData = {
  memoryId: 4,
  date: "19 May 2021",
  title: "Mock Memory Title",
  description: "This is a mock card description. This is a mock card description. This is a mock card description. This is a mock card description. This is a mock card description.",
  media: [
    {
      type: "IMAGE",
      source: {
        url: "https://images.megapixl.com/2485/24853666.jpg"
      },
    }
  ],
  latitude: 1.359237,
  longitude: 103.98934,
}

// returns memory data
export const getMemoryById = (id) => {
  return {
    ...mockMemoryData,
    memoryId: id,
    mediaUrls: mockMemoryData.media.map((m, idx) => ({ url: m.source.url, position: idx }))
  }
}

// TODO: connect with backend
export const deleteMemoryById = async (id) => {
  console.log('deleted');
  // const res = await server.delete(`${id}`);
  // return res.data
}
