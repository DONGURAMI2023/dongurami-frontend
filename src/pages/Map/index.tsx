import React, { useState, useEffect } from "react";
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

const Map: React.FC = () => {
  const [map, setMap] = useState<null | any>(null);
  const [bottomModal, setBottomModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  const [detailAddr, setDetailAddr] = useState<string>("");
  const [notPurchasedDongData, setNotPurchasedDongData] = useState<any[]>([]);
  const [purchasedDongData, setPurchasedDongData] = useState<any[]>([]);
  const [clickedDong, setClickedDong] = useState<any>(null);

  // 구입된 동 데이터를 배열로 저장

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  // dondData 가져오기
  // const getDongData = async () => {
  //   const { isPending, isError, data, error } = useQuery({
  //     queryKey: ["dongData"],
  //     queryFn: () => getApi({ url: "area" }),
  //   });
  //   if (data) {
  //     setNotPurchasedDongData(
  //       data.result.filter((dong: any) => dong.user === null)
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getDongData();
  // }, []);

  const getDongData = async () => {
    try {
      const { result } = await getApi({ url: "area" });
      console.log(result);
      setNotPurchasedDongData(result.filter((dong: any) => dong.user === null));
      setPurchasedDongData(result.filter((dong: any) => dong.user !== null));
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

  const showBottomModal = () => {
    if (!bottomModal) {
      console.log("true로 바꿉니다.");
      setBottomModal(true);
    }
  };

  const closeBottomModal = () => {
    if (bottomModal) {
      console.log("false로 바꿉니다.");
      setBottomModal(false);
    }
  };

  console.log("현재 상태는", bottomModal);

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
    console.log("구입");
    closePurchaseModal();
  };

  const cancelPurchase = () => {
    console.log("취소");
    closePurchaseModal();
  };

  function searchDetailAddrFromCoords(coords: any, callback: any) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도에 폴리곤으로 동 구분
  useEffect(() => {
    const drawDong = () => {
      DONG_DATA.forEach((dong: any) => {
        const poloygonPath: any[] = [];

        dong.coordinates[0][0].forEach((coordinate: any) => {
          poloygonPath.push(
            new kakao.maps.LatLng(coordinate[1], coordinate[0])
          );
        });

        const polygon = new kakao.maps.Polygon({
          map: map,
          path: poloygonPath,
          strokeWeight: 3,
          strokeColor: "#8EAE57",
          strokeOpacity: 0.6,
          fillColor: "#fff",
          fillOpacity: 0.1,
        });

        // 폴리곤에 mouseover 이벤트 등록하고 이벤트가 발생하면 폴리곤의 채움색을 바꿉니다.
        kakao.maps.event.addListener(polygon, "mouseover", function () {
          polygon.setOptions({ fillColor: "#8EAE57" });
        });

        // 폴리곤에 mouseout이벤트를 등록하고 에밴트가 발생하면 폴리곤의 채움색을 원래대로 변경합니다.
        kakao.maps.event.addListener(polygon, "mouseout", function () {
          polygon.setOptions({ fillColor: "#fff" });
        });

        // 폴리곤에 click 이벤트를 등록하고 맵의 클릭이벤트를 없애고, 구입 정보를 모달로 띄웁니다.
        // 백엔드에서 가져온 이미 구입된 동데이터의 넘버와 비교해서 같으면 구입 정보 대신, 인수 정보가 뜹니다.
        kakao.maps.event.addListener(
          polygon,
          "click",
          function (mouseEvent: any) {
            // 동 정보 가져오는 함수
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result: any, status: any) {
                if (
                  status === kakao.maps.services.Status.OK &&
                  result &&
                  result[0]
                ) {
                  // Check if road_address and address exist before accessing their properties
                  let addr = "";
                  if (result[0].address) {
                    addr += result[0].address.address_name.split(" ")[2];
                  }
                  setDetailAddr(addr);
                }
              }
            );
            console.log(bottomModal);
            kakao.maps.event.preventMap();
            setClickedDong(dong.dongNumber);
            if (bottomModal) {
              console.log("close");
              closeBottomModal();
            } else {
              console.log("open");
              showBottomModal();
            }
            console.log(dong.dongNumber);
          }
        );
      });

      kakao.maps.event.addListener(map, "click", function () {
        closeBottomModal();
      });
    };

    if (map) {
      drawDong();
    }
  }, [map, bottomModal]);

  console.log(notPurchasedDongData);

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
      <BottomModal visible={bottomModal}>
        <DongName>{detailAddr}</DongName>
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

const DongName = styled.div`
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
