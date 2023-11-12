import rawDongData from "../assets/daeguGeo.json";

export const DEAGU_CENTER_POINT = {
  LATITUDE: 35.8714354,
  LONGITUDE: 128.601445,
};

export type TypeCoordinate = [number, number];
export interface IDongData {
  dongNumber: number;
  coordinates: TypeCoordinate[];
}

export const DONG_DATA = rawDongData.features.map((dong: any): IDongData => {
  return {
    dongNumber: dong.properties.OBJECTID,
    coordinates: dong.geometry.coordinates[0][0],
  };
});
