import { IDongData } from "model/Map";
import rawDongData from "../assets/daeguGeo.json";

export const DEAGU_CENTER_POINT = {
  LATITUDE: 35.8714354,
  LONGITUDE: 128.601445,
};

export const DONG_DATA = rawDongData.features.map((dong: any): IDongData => {
  return {
    dongNumber: dong.properties.OBJECTID,
    coordinates: dong.geometry.coordinates[0][0],
  };
});

export const DEFAULT_IMAGE = `https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M`;

export const CENTER_POINTS = [
  {
    dongNumber: 626,
    address: "대구 중구 문화동 12-23",
    guName: "중구",
    dongName: "문화동",
    lat: 35.87093418506788,
    lng: 128.59713759757167,
  },
  {
    dongNumber: 636,
    address: "대구 중구 동인동3가 88",
    guName: "중구",
    dongName: "동인동3가",
    lat: 35.87015443163012,
    lng: 128.6069533918343,
  },
  {
    dongNumber: 625,
    address: "대구 중구 삼덕동2가 327",
    guName: "중구",
    dongName: "삼덕동2가",
    lat: 35.86550408496451,
    lng: 128.60429105935552,
  },
  {
    dongNumber: 634,
    address: "대구 중구 대봉동 758",
    guName: "중구",
    dongName: "대봉동",
    lat: 35.859738323824814,
    lng: 128.60417484297486,
  },
  {
    dongNumber: 719,
    address: "대구 수성구 수성동4가 1090-6",
    guName: "수성구",
    dongName: "수성동4가",
    lat: 35.862829666648445,
    lng: 128.61557325391493,
  },
  {
    dongNumber: 712,
    address: "대구 수성구 범어동 832",
    guName: "수성구",
    dongName: "범어동",
    lat: 35.86408559341991,
    lng: 128.62401238416157,
  },
  {
    dongNumber: 710,
    address: "대구 수성구 범어동 371",
    guName: "수성구",
    dongName: "범어동",
    lat: 35.854249157078335,
    lng: 128.62637976334244,
  },
  {
    dongNumber: 718,
    address: "대구 수성구 수성동3가 289",
    guName: "수성구",
    dongName: "수성동3가",
    lat: 35.855232358405566,
    lng: 128.6176329342937,
  },
  {
    dongNumber: 717,
    address: "대구 수성구 수성동1가 822",
    guName: "수성구",
    dongName: "수성동1가",
    lat: 35.85546573239132,
    lng: 128.61099604673834,
  },
  {
    dongNumber: 674,
    address: "대구 남구 이천동 361-3",
    guName: "남구",
    dongName: "이천동",
    lat: 35.852001767111204,
    lng: 128.60047689987405,
  },
];
