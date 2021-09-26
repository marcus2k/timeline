import server from "../utils/server";

const blobToFile = (blob, fileName="default-name", type="image/png") => {
  const file = new File([blob], fileName, { type });
  return file
}

export const createNewMedia = async (media, memoryId) => {
  const body = new FormData(); 
  body.append("memoryId", memoryId);
  body.append("position", media.position);

  const loadImageFile = async (url, idx) => {
    const filename = `im-${idx}`;
    await fetch(url)
      .then(res => res.blob())
      .then(blob => blobToFile(blob, filename))
      .then(file => body.append("images", file));
  };

  await loadImageFile(media.url, media.position);

  const res = await server.post("media", body);
  return res.data.media;
}

export const deleteMediaById = async (mediaId) => {
  const res = await server.delete(`media/${mediaId}`);
  return res.data.media; // [ contains deletedMedia ]
}
