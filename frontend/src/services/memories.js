import server from "../utils/server";

const blobToFile = (blob, fileName="default-name", type="image/png") => {
  const file = new File([blob], fileName, { type });
  return file
}

const convertCoordinatesToString = (memory) => {
  return {
    ...memory,
    latitude: memory.latitude.toString(),
    longitude: memory.longitude.toString(),
  }
}

const convertCoordinatesToFloat = (memory) => {
  return {
    ...memory,
    latitude: parseFloat(memory.latitude),
    longitude: parseFloat(memory.longitude),
  }
}

export const getMemoryById = async (memoryId) => {
  const res = await server.get(`memories/${memoryId}`);
  const memory = res.data.memory
  return convertCoordinatesToFloat(memory);
}

export const createNewMemory = async (title, lineId, description, latitude, longitude, mediaUrls) => {
  const body = new FormData(); 
  body.append("title", title);
  body.append("line", lineId);
  body.append("description", description);
  body.append("latitude", latitude); // will be automatically be string (text)
  body.append("longitude", longitude); // will be automatically be string (text)

  const loadImageFile = async (url, idx) => {
    const filename = `im-${idx}`;
    await fetch(url)
      .then(res => res.blob())
      .then(blob => blobToFile(blob, filename))
      .then(file => body.append("images", file));
  };

  for (let idx = 0; idx < mediaUrls.length; idx++) {
    const url = mediaUrls[idx].url;
    await loadImageFile(url, idx);
  }

  const res = await server.post(`memories`, body);
  return convertCoordinatesToFloat(res.data.memory);
}

export const editMemoryDetailsById = async (memoryId, title, description, line, longitude, latitude) => {
  const memoryData = {
    title, description, line, longitude, latitude, 
  };
  const body = convertCoordinatesToString(memoryData);
  const res = await server.patch(`memories/${memoryId}`, body);
  return convertCoordinatesToFloat(res.data.memory);
}

export const deleteMemoryById = async (memoryId) => {
  const res = await server.delete(`memories/${memoryId}`);
  return convertCoordinatesToFloat(res.data.memory);
}
