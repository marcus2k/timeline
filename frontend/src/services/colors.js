export const removeHash = (colorHexCode) => {
  return colorHexCode.substring(1);
}

export const addHash = (colorHexCode) => {
  return "#" + colorHexCode;
}
