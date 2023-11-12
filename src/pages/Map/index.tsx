/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import { CENTER_POINTS, DEFAULT_IMAGE, DONG_DATA } from "../../consts/map";
import styled from "styled-components";
import { DEAGU_CENTER_POINT } from "../../consts/map";
import BottomModal from "../../components/BottomModal";
import Modal from "../../components/Modal";
import { getApi, putApi } from "utils/http";
import houseImage from "../../assets/icon_house.svg";
import flagImage from "../../assets/icon_flag.svg";
import towerImage from "../../assets/icon_tower.svg";
import castleImage from "../../assets/icon_castle.svg";
import buildingImage from "../../assets/icon_building.svg";
import logo from "../../assets/logo.png";
import Svg from "components/Svg";
import {
  IPolygon,
  IPolygonData,
  IPolygonCreateData,
  IPriceData,
  IAreaData,
  TypeBuilding,
} from "model/Map";
import { userState } from "pages/Store/userState";
import { useRecoilState } from "recoil";
import { buildingImageMap } from "utils/map";
import Flex from "components/Flex";
import ImgRounded from "components/ImgRounded";
import CustomNav from "components/CustomNav";
import IconButton from "components/IconButton";
import { IoHelp, IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

const PriceData: IPriceData[] = [
  { image: flagImage, name: "땅", multiplier: 1.0, id: 0 },
  { image: houseImage, name: "주택", multiplier: 1.2, id: 1 },
  { image: buildingImage, name: "빌딩", multiplier: 1.4, id: 2 },
  { image: castleImage, name: "궁전", multiplier: 1.6, id: 4 },
  { image: towerImage, name: "랜드마크", multiplier: 1.8, id: 8 },
];

const { kakao } = window;

const Map: React.FC = () => {
  const navigate = useNavigate();

  const [map, setMap] = useState<null | any>(null);
  const [bottomModal, setBottomModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<
    (IPriceData & { price: number }) | null
  >(null);
  const [purchasedDongData, setPurchasedDongData] = useState<IAreaData[]>([]);
  const [notPurchasedDongData, setNotPurchasedDongData] = useState<IAreaData[]>(
    []
  );
  const [user] = useRecoilState(userState);
  const [clickedDong, setClickedDong] = useState<any>(null);
  const [detailAddr, setDetailAddr] = useState<string>("");
  const polygons = useRef<IPolygon[]>([]);

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  const showPurchaseModal = (
    data: IPriceData & { price: number; building: number }
  ) => {
    if (!purchaseModal) {
      setPurchaseModal(data);
    }
  };

  const closePurchaseModal = () => {
    if (purchaseModal) {
      setPurchaseModal(null);
    }
  };

  const purchaseDong = async (buildingId: number) => {
    try {
      const { result } = await putApi<{ result: string; message: string }>({
        url: `/area/${clickedDong}/take/${user.id}`,
        requestBody: {
          building: buildingId,
        },
      });
      if (result === "success") {
        alert("성공적으로 구매하였습니다.");
        window.location.reload();
      } else alert("구매에 실패하였습니다.");
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 403) {
        const needPoint = e.response.data.need;
        alert(`포인트가 ${needPoint} point 부족합니다.`);
      } else {
        alert("구매중 에러가 발생했습니다.");
      }
    }
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
    const drawOverlays = () => {
      const createOverlayComponent = (
        buildingType: TypeBuilding,
        imageUrl: string = DEFAULT_IMAGE
      ) => {
        return `
        <div class="flex flex-col items-center w-[68px] gap-1 h-auto scale-[65%]">
            <img class='w-[40px] h-[40px]' src="${buildingImageMap[buildingType]}">
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
          content: createOverlayComponent(
            dong.building as TypeBuilding,
            dong?.user?.profile_image ?? DEFAULT_IMAGE
          ),
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
      });
    };

    const drawDongs = () => {
      const applyBackgroundColor = (polygon: IPolygon) => {
        const myDongs = purchasedDongData.filter(
          (dong) => dong.user?.email === user.email
        );
        const notMyDongs = purchasedDongData.filter(
          (dong) => dong.user?.email !== user.email
        );
        // 내가 가지고있는 동이라면
        if (myDongs.find((dong) => dong.id === polygon.polygonMetaData.id)) {
          polygon.polygonDOM.setOptions({ fillColor: "#00FF00" });
        } else if (
          notMyDongs.find((dong) => dong.id === polygon.polygonMetaData.id)
        ) {
          polygon.polygonDOM.setOptions({ fillColor: "#FF0000" });
        }
      };

      const applyMouseoverListener = (polygon: IPolygon) => {
        kakao.maps.event.addListener(
          polygon.polygonDOM,
          "mouseover",
          function () {
            if (
              purchasedDongData.find(
                (dong) => dong.id === polygon.polygonMetaData.id
              )
            ) {
              return;
            }
            polygon.polygonDOM.setOptions({ fillColor: "#8EAE57" });
          }
        );
      };

      const applyMouseoutListener = (polygon: IPolygon) => {
        kakao.maps.event.addListener(
          polygon.polygonDOM,
          "mouseout",
          function () {
            if (
              purchasedDongData.find(
                (dong) => dong.id === polygon.polygonMetaData.id
              )
            ) {
              return;
            }
            polygon.polygonDOM.setOptions({ fillColor: "#fff" });
          }
        );
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
          fillOpacity: 0.15,
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
        applyMouseoverListener(polygon);
        applyMouseoutListener(polygon);
        applyBackgroundColor(polygon);
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
      <CustomNav
        leftComponent={
          <Flex type="horizontalCenter" className="gap-3">
            <IconButton onClick={() => navigate("/mypage")}>
              <IoPersonCircleOutline size="24" />
            </IconButton>
          </Flex>
        }
        centerComponent={
          <Flex type="horizontalCenter" className="gap-3 h-full">
            <img className="h-full scale-125" src={logo}></img>
          </Flex>
        }
        rightComponent={
          <IconButton onClick={() => navigate("/guide")}>
            <IoHelp size="24" />
          </IconButton>
        }
      />
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
                              building: item.id,
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

        {detailAddr &&
          purchasedDongData
            .filter((dong) => dong.user?.email === user.email)
            .map((dong) => (
              <div key={dong.id}>
                {dong.id === clickedDong && (
                  <Flex
                    type="verticalCenter"
                    className="w-full min-h-[40vh] pt-2 gap-3"
                  >
                    <div className="mt-2"></div>
                    <ImgRounded
                      src={dong.user?.profile_image ?? DEFAULT_IMAGE}
                    ></ImgRounded>
                    <p>현재 소유중이신,</p>

                    <img
                      src={buildingImageMap[dong.building as TypeBuilding]}
                    ></img>
                    <p>
                      <span className="underline font-bold text-xl">
                        {PriceData.find((d) => d.id === dong.building)?.name}
                      </span>
                      을 매각하시겠습니까?
                    </p>
                    <button
                      onClick={() => {
                        alert("매각되었습니다.");
                        window.location.reload();
                      }}
                      className="rounded px-4 py-2 bg-red-400 text-white hover:brightness-90 my-2"
                    >
                      매각하기
                    </button>
                  </Flex>
                )}
              </div>
            ))}

        {detailAddr &&
          purchasedDongData
            .filter((dong) => dong.user?.email !== user.email)
            .map((dong) => (
              <div key={dong.id}>
                {dong.id === clickedDong && (
                  <Flex
                    type="verticalCenter"
                    className="w-full min-h-[40vh] pt-2 gap-3"
                  >
                    <div className="mt-2"></div>
                    <ImgRounded
                      src={dong.user?.profile_image ?? DEFAULT_IMAGE}
                    ></ImgRounded>
                    <p>
                      <span className="font-bold text-xl">
                        {dong.user?.username}
                      </span>
                      님이 가지고 있는
                    </p>

                    <img
                      src={buildingImageMap[dong.building as TypeBuilding]}
                    ></img>
                    <p>
                      <span className="font-bold text-xl">
                        {PriceData.find((d) => d.id === dong.building)?.name}
                      </span>
                      을{" "}
                      <span className="text-xl font-bold text-red-500 underline">
                        인수
                      </span>
                      하시겠습니까?
                    </p>
                    <button
                      onClick={() => {
                        purchaseDong(dong.building);
                      }}
                      className="rounded px-4 py-2 bg-red-400 text-white hover:brightness-90 my-2"
                    >
                      인수하기
                    </button>
                  </Flex>
                )}
              </div>
            ))}
      </BottomModal>
      <Modal
        title={`🏠 ${purchaseModal?.name}${
          purchaseModal?.name === "랜드마크" ? "를" : "을"
        } 구매하시겠습니까?`}
        visible={!!purchaseModal}
        onConfirm={() => purchaseDong(purchaseModal?.id ?? 0)}
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
