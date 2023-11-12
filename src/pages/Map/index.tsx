/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import { CENTER_POINTS, DEFAULT_IMAGE, DONG_DATA } from "../../consts/map";
import styled from "styled-components";
import { DEAGU_CENTER_POINT } from "../../consts/map";
import BottomModal from "../../components/BottomModal";
import Modal from "../../components/Modal";
import { getApi } from "utils/http";
import houseImage from "../../assets/icon_house.svg";
import flagImage from "../../assets/icon_flag.svg";
import towerImage from "../../assets/icon_tower.svg";
import castleImage from "../../assets/icon_castle.svg";
import buildingImage from "../../assets/icon_building.svg";
import Svg from "components/Svg";
import {
  IPolygon,
  IPolygonData,
  IPolygonCreateData,
  IPriceData,
  IAreaData,
  TypeBuilding,
} from "model/Map";

declare global {
  interface Window {
    kakao: any;
  }
}

const PriceData: IPriceData[] = [
  { image: flagImage, name: "땅", multiplier: 1.0 },
  { image: houseImage, name: "주택", multiplier: 1.2 },
  { image: buildingImage, name: "빌딩", multiplier: 1.4 },
  { image: castleImage, name: "궁전", multiplier: 1.6 },
  { image: towerImage, name: "랜드마크", multiplier: 1.8 },
];

const { kakao } = window;

const Map: React.FC = () => {
  const [map, setMap] = useState<null | any>(null);
  const [bottomModal, setBottomModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<
    (IPriceData & { price: number }) | null
  >(null);
  const [purchasedDongData, setPurchasedDongData] = useState<IAreaData[]>([]);
  const [notPurchasedDongData, setNotPurchasedDongData] = useState<IAreaData[]>(
    []
  );
  const [clickedDong, setClickedDong] = useState<any>(null);
  const [detailAddr, setDetailAddr] = useState<string>("");
  const polygons = useRef<IPolygon[]>([]);

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  const showPurchaseModal = (data: IPriceData & { price: number }) => {
    if (!purchaseModal) {
      setPurchaseModal(data);
    }
  };

  const closePurchaseModal = () => {
    if (purchaseModal) {
      setPurchaseModal(null);
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

  const getDongData = async () => {
    try {
      const { result: areaData } = await getApi<{ result: IAreaData[] }>({
        url: "area",
      });
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
      level: 5,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    setMap(createdMap);
  }, []);

  const getDongPosition = (id: number): { lat: number; lng: number } => {
    const dong = CENTER_POINTS.find((point) => point.dongNumber === id);
    const lat = dong?.lat ?? DEAGU_CENTER_POINT.LATITUDE;
    const lng = dong?.lng ?? DEAGU_CENTER_POINT.LONGITUDE;
    return { lat, lng };
  };

  // 지도에 폴리곤으로 동 구분
  useEffect(() => {
    console.log("purchasedDongData", purchasedDongData);

    const drawOverlays = () => {
      const createOverlayComponent = (
        buildingType: TypeBuilding,
        imageUrl: string = DEFAULT_IMAGE
      ) => {
        const buildingImage =
          buildingType === 0
            ? "icon_flag.svg"
            : buildingType === 1
            ? "icon_house.svg"
            : buildingType === 2
            ? "icon_building.svg"
            : buildingType === 4
            ? "icon_castle.svg"
            : "icon_tower.svg";

        return `
        <div class="flex flex-col items-center w-[68px] gap-1 h-auto scale-[65%]">
            <img class='w-[40px] h-[40px]' src="${buildingImage}">
            </img>
            <div class="w-[68px] h-[68px] flex-col items-center flex rounded-full bg-white border border-gray-300 overflow-clip p-[2px] shadow-md z-0 cursor-pointer">
              <div class="flex-col items-center flex w-full h-full rounded-full p-[2px] z-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500">
                <div class="flex-col w-full h-full items-center flex rounded-full bg-white p-[2px] z-20">
                <img class="w-[100px] h-[100px] rounded-full z-30" src="${imageUrl}" />
                </div>
            </div>
            </div>
          </div>
        `;
      };

      purchasedDongData.map((dong) => {
        const dongPosition = getDongPosition(dong.id);

        const position = new kakao.maps.LatLng(
          dongPosition.lat,
          dongPosition.lng
        );

        // 커스텀 오버레이를 생성합니다
        const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          xAnchor: 0,
          yAnchor: 0,
          content: createOverlayComponent(
            dong.building as TypeBuilding,
            dong?.user?.profile_image ?? DEFAULT_IMAGE
          ),
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
      });

      return;
      const position = new kakao.maps.LatLng(
        DEAGU_CENTER_POINT.LATITUDE,
        DEAGU_CENTER_POINT.LONGITUDE
      );
    };

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
            if (!bottomModal) {
              setDetailAddr((_) => "");
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
            }

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
      drawOverlays();
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
        {detailAddr &&
          notPurchasedDongData.map((dong) => (
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
                        <Button
                          onClick={() =>
                            showPurchaseModal({
                              ...item,
                              price: Math.floor(dong.price * item.multiplier),
                            })
                          }
                        >
                          구매
                        </Button>
                      </ButtonContainer>
                    </PriceBlock>
                  ))}
                </PriceContainer>
              )}
            </div>
          ))}
      </BottomModal>
      <Modal
        title={`🏠 ${purchaseModal?.name}${
          purchaseModal?.name === "랜드마크" ? "를" : "을"
        } 구매하시겠습니까?`}
        visible={!!purchaseModal}
        onConfirm={purchaseDong}
        onCancel={cancelPurchase}
        confirmText="확인"
        cancelText="취소"
      >
        <ModalContainer>
          구매가격은{" "}
          <span className="font-bold underline text-red-500">
            {purchaseModal?.price ?? 0} Point{" "}
          </span>
          입니다.
        </ModalContainer>
      </Modal>

      {/* <img
        src={
          "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
        }
        className="w-full h-full object-cover rounded-full"
        alt="flag"
      /> */}
    </MapContainer>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  /* overflow: hidden; */
`;

const Button = styled.button`
  /* width: 60px; */
  /* height: 20px; */
  padding: 0.5rem 1.5rem;
  background-color: aliceblue;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.2;
  font-weight: 600;
  border-radius: 6px;
  :hover {
    filter: brightness(0.9);
  }
`;

const NameWrapper = styled.div`
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const PriceContainer = styled.div`
  width: 100%;
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
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  height: 50px;
  width: 400px;
  display: flex;

  justify-content: center;
  &:not(:last-child) {
    border-bottom: 1.5px solid lightgray;
  }
  &:hover {
    background-color: #a3a3a36a;
  }
`;

export default Map;
