import React, { useState, useEffect } from "react";
import rawDongData from "../../assets/daeguGeo.json";
import NavBar from "../../components/NavBar";
import styled from "styled-components";
import { DEAGU_CENTER_POINT } from "../../consts/map";
import BottomModal from "../../components/BottomModal";
import Modal from "../../components/Modal";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Map: React.FC = () => {
  const [map, setMap] = useState<null | any>(null);
  const [bottomModal, setBottomModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  // const [markers, setMarkers] = useState<any[]>([]);
  // const [infoWindows, setInfoWindows] = useState<any[]>([]);

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
      setBottomModal(true);
    }
  };

  const closeBottomModal = () => {
    if (bottomModal) {
      setBottomModal(false);
    }
  };

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

  // 지도에 폴리곤으로 동 구분
  useEffect(() => {
    const drawDong = () => {
      const dongData = rawDongData.features.map((dong: any) => {
        return {
          dongNumber: dong.properties.OBJECTID,
          coordinates: dong.geometry.coordinates,
        };
      });

      // 백엔드에서 가져온 구입된 동데이터의 넘버와 같으면, coordinates의 중심 좌표를 계산하는 함수를 만들어서 그 좌표에 마커와 구입한 사람 정보를 띄웁니다.
      dongData.forEach((dong: any) => {
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
          fillOpacity: 0.4,
        });

        polygon.setMap(map);

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
        kakao.maps.event.addListener(polygon, "click", function () {
          kakao.maps.event.preventMap();

          if (bottomModal) {
            closeBottomModal();
          } else {
            showBottomModal();
          }
          console.log(dong.dongNumber);
        });

        kakao.maps.event.addListener(map, "click", function () {
          console.log("맵 클릭");
          closeBottomModal();
        });
      });
    };

    if (map) {
      drawDong();
    }
  }, [map, bottomModal]);

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
        <Button onClick={showPurchaseModal}>땅 구입</Button>
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
  background-color: red;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.2;
  font-weight: 600;
`;

export default Map;
