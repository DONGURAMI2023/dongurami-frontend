/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import { DONG_DATA } from "../../consts/map";
import styled from "styled-components";
import { DEAGU_CENTER_POINT } from "../../consts/map";
import BottomModal from "../../components/BottomModal";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "utils/http";
import houseImage from "../../assets/icon_house.svg";
import flagImage from "../../assets/icon_flag.svg";
import towerImage from "../../assets/icon_tower.svg";
import castleImage from "../../assets/icon_castle.svg";
import buildingImage from "../../assets/icon_building.svg";
import Svg from "components/Svg";

interface IPolygonMetaData {
  id: number;
}
interface IPolygonCreateData {
  map: any;
  path: any[];
  strokeWeight: number;
  strokeColor: string;
  strokeOpacity: number;
  fillColor: string;
  fillOpacity: number;
}

interface IPolygonData {
  metaData: IPolygonMetaData;
  createData: IPolygonCreateData;
}

interface IPolygon {
  polygonDOM: any;
  polygonMetaData: IPolygonMetaData;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const PriceData = [
  { image: flagImage, name: "땅", multiplier: 1.0 },
  { image: houseImage, name: "주택", multiplier: 1.2 },
  { image: buildingImage, name: "빌딩", multiplier: 1.4 },
  { image: castleImage, name: "궁전", multiplier: 1.6 },
  { image: towerImage, name: "랜드마크", multiplier: 1.8 },
];

const { kakao } = window;

type TypeUser = any;
interface IAreaData {
  id: number;
  user: TypeUser | null;
  price: number;
  building: number;
}

const Map: React.FC = () => {
  const [map, setMap] = useState<null | any>(null);
  const [bottomModal, setBottomModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  const [purchasedDongData, setPurchasedDongData] = useState<any[]>([]);
  const [clickedDong, setClickedDong] = useState<any>(null);
  const [detailAddr, setDetailAddr] = useState<string>("");
  const [notPurchasedDongData, setNotPurchasedDongData] = useState<any[]>([]);
  const polygons = useRef<IPolygon[]>([]);

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  const getDongData = async () => {
    try {
      const { result: areaData } = await getApi<IAreaData[]>({ url: "area" });

      setNotPurchasedDongData(areaData.filter((dong) => dong.user === null));
      setPurchasedDongData(
        areaData.filter((dong: IAreaData) => dong.user !== null)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDongData();
  }, []);

  // 초기 지도 설정
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        DEAGU_CENTER_POINT.LATITUDE,
        DEAGU_CENTER_POINT.LONGITUDE
      ),
      level: 7,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    setMap(createdMap);
  }, []);

  const showPurchaseModal = () => {
    if (!purchaseModal) {
      setPurchaseModal(true);
    }
  };

  const closePurchaseModal = () => {
    if (purchaseModal) {
      setPurchaseModal(false);
    }
  };

  const purchaseDong = () => {
    closePurchaseModal();
  };

  const cancelPurchase = () => {
    closePurchaseModal();
  };

  function searchDetailAddrFromCoords(coords: any, callback: any) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도에 폴리곤으로 동 구분
  useEffect(() => {
    const drawDongs = () => {
      const applyMouseoverListener = (polygon: any) => {
        kakao.maps.event.addListener(polygon, "mouseover", function () {
          polygon.setOptions({ fillColor: "#8EAE57" });
        });
      };

      const applyMouseoutListener = (polygon: any) => {
        kakao.maps.event.addListener(polygon, "mouseout", function () {
          polygon.setOptions({ fillColor: "#fff" });
        });
      };

      const applyClickListener = (polygon: IPolygon) => {
        kakao.maps.event.addListener(
          polygon.polygonDOM,
          "click",
          function (e: any) {
            // 동 이름 정보 불러오기
            if (!bottomModal) setDetailAddr("");
            searchDetailAddrFromCoords(
              e.latLng,
              function (result: any, status: any) {
                if (status === kakao.maps.services.Status.OK) {
                  setDetailAddr(
                    (_) =>
                      result[0]?.address?.address_name?.split(" ")[2] ??
                      "금은동"
                  );
                }
              }
            );
            // 동 자세한 정보 불러오기

            kakao.maps.event.preventMap();
            setBottomModal((prev) => !prev);
            setClickedDong(polygon.polygonMetaData.id);
          }
        );
      };

      // set polygon datas needed for drawing polygon on the map
      const polygonDatas: IPolygonData[] = DONG_DATA.map((dong) => {
        const polygonPath = dong.coordinates.map(
          (coordinate) => new kakao.maps.LatLng(coordinate[1], coordinate[0])
        );

        const polygonCreateData: IPolygonCreateData = {
          map: map,
          path: polygonPath,
          strokeWeight: 3,
          strokeColor: "#8EAE57",
          strokeOpacity: 0.6,
          fillColor: "#fff",
          fillOpacity: 0.1,
        };

        return {
          metaData: { id: dong.dongNumber },
          createData: polygonCreateData,
        };
      });

      // remove polygon first
      if (polygons.current && polygons.current.length >= 0) {
        polygons.current.forEach((polygon) => polygon.polygonDOM.setMap(null));
      }

      // draw polygons
      polygons.current = polygonDatas.map((polygonData) => {
        return {
          polygonDOM: new kakao.maps.Polygon(polygonData.createData),
          polygonMetaData: polygonData.metaData,
        };
      });

      // add event listener depends on modal status
      polygons.current.forEach((polygon) => {
        applyMouseoverListener(polygon.polygonDOM);
        applyMouseoutListener(polygon.polygonDOM);
        applyClickListener(polygon);
      });
    };

    const applyClickMapListener = () => {
      kakao.maps.event.addListener(
        map,
        "click",
        () => bottomModal && setBottomModal(false)
      );
    };

    if (map) {
      applyClickMapListener();
      drawDongs();
    }
  }, [map, bottomModal, searchDetailAddrFromCoords]);

  return (
    <MapContainer>
      <NavBar />
      <div
        id="map"
        style={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
        }}
      ></div>

      {/* modals */}
      <BottomModal visible={bottomModal}>
        <NameWrapper>
          {detailAddr ? (
            detailAddr
          ) : (
            <Svg
              icon="icon_loading_gif"
              className="!max-w-[3rem] !max-h-[3rem]"
            />
          )}
        </NameWrapper>
        {notPurchasedDongData.map((dong) => (
          <div key={dong.id}>
            {dong.id === clickedDong && (
              <PriceContainer>
                {PriceData.map((item, index) => (
                  <PriceBlock key={index}>
                    <ImageContainer>
                      <img src={item.image} alt={item.name} />
                    </ImageContainer>
                    <PriceNameContainer>
                      <Name>{item.name} :</Name>
                      <Point>
                        {Math.floor(dong.price * item.multiplier)} point
                      </Point>
                    </PriceNameContainer>
                    <ButtonContainer>
                      <Button onClick={showPurchaseModal}>구매</Button>
                    </ButtonContainer>
                  </PriceBlock>
                ))}
              </PriceContainer>
            )}
          </div>
        ))}
      </BottomModal>
      <Modal
        title="땅을 구매 하시겠습니까?"
        visible={purchaseModal}
        onConfirm={purchaseDong}
        onCancel={cancelPurchase}
        confirmText="확인"
        cancelText="취소"
      ></Modal>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  /* overflow: hidden; */
`;

const Button = styled.button`
  width: 60px;
  height: 20px;
  background-color: aliceblue;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.2;
  font-weight: 600;
`;

const NameWrapper = styled.div`
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const PriceContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.span`
  width: px;
  font-size: 1rem;
  margin-right: 1rem;
`;

const Point = styled.span`
  font-size: 1rem;
`;

const ImageContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceNameContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceBlock = styled.div`
  height: 50px;
  width: 400px;
  &:not(:last-child) {
    border-bottom: 1.5px solid lightgray;
  }
  padding-bottom: 1rem;
  display: flex;

  justify-content: center;
  margin: 0.8rem 0.5rem;
`;

export default Map;
