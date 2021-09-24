import React from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import { MAPBOX_API_TOKEN } from "../../../services/locationService";
import { getLineConnectors } from "../../../utils/map";
import MapMarker from "./MapMarker";
import { useEffect } from "react";

// https://stackoverflow.com/questions/67842338/how-to-use-react-map-gl-to-draw-line-between-two-point
// how to draw a line between the 2 points
const MapDisplay = ({ memoriesData, viewport, setViewport, lineColor }) => {
  const lineConnectors = getLineConnectors(memoriesData);
  useEffect(() => {
    setViewport(viewport);
  }, [viewport, setViewport]);

  const geojson = {
    type: "FeatureCollection",
    features: lineConnectors,
  };

  const layerStyle = {
    id: "route",
    type: "line",
    paint: {
      // "line-color": COLORS.GREEN,
      "line-color": `${lineColor}`,
      "line-width": 2,
    },
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={(v) => setViewport(v)}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
          {memoriesData.map((memory) => (
            <MapMarker memory={memory} key={memory.memoryId} />
          ))}
        </Source>
      </ReactMapGL>
    </>
  );
};

export default MapDisplay;
