export interface IPolygonMetaData {
  id: number;
}
export interface IPolygonCreateData {
  map: any;
  path: any[];
  strokeWeight: number;
  strokeColor: string;
  strokeOpacity: number;
  fillColor: string;
  fillOpacity: number;
}

export interface IPolygonData {
  metaData: IPolygonMetaData;
  createData: IPolygonCreateData;
}

export interface IPolygon {
  polygonDOM: any;
  polygonMetaData: IPolygonMetaData;
}

export interface IPriceData {
  image: any;
  name: string;
  multiplier: number;
  id: number;
}

export type TypeCoordinate = [number, number];
export interface IDongData {
  dongNumber: number;
  coordinates: TypeCoordinate[];
}

export type TypeUser = {
  id: number;
  email: string;
  username: string;
  profile_image: string;
};
export interface IAreaData {
  id: number;
  user: TypeUser | null;
  price: number;
  building: number;
}

export type TypeBuilding = 0 | 1 | 2 | 4 | 8;
