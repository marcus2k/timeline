/**
 * Method to get an array of line connectors
 * @param {Object[]} memoriesData, array of memories 
 * @returns {Object[]} 
 */
export const getLineConnectors = (memoriesData) => {
  if (memoriesData.length === 1 || memoriesData.length === 0) {
    return [];
  }
  let lineConnectors = [];
  for (let i = 1; i < memoriesData.length; i++) {
    lineConnectors.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [memoriesData[i].longitude, memoriesData[i].latitude],
          [memoriesData[i - 1].longitude, memoriesData[i - 1].latitude],
        ]
      }
    });
  }
  return lineConnectors
}
