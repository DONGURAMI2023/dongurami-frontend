import rawDongData from "../assets/daeguGeo.json";

export const DEAGU_CENTER_POINT = {
  LATITUDE: 35.8714354,
  LONGITUDE: 128.601445,
};

export const DONG_DATA = rawDongData.features.map((dong: any) => {
  return {
    dongNumber: dong.properties.OBJECTID,
    coordinates: dong.geometry.coordinates,
  };
});
