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
