import styled from "styled-components";
import CustomNav from "components/CustomNav";
import {
  IoPersonCircleOutline,
  IoClose,
  IoChevronForwardSharp,
} from "react-icons/io5";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import ImgRounded from "components/ImgRounded";
import Slider from "components/Slider";
import ImgSquare from "components/ImgSquare";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "pages/Store/userState";
import { useEffect, useState } from "react";
import { IUserProfileData } from "model/UserInfo";
import { getApi } from "utils/http";
import Loading from "components/Loading";
import houseImage from "../../assets/icon_house.svg";
import flagImage from "../../assets/icon_flag.svg";
import towerImage from "../../assets/icon_tower.svg";
import castleImage from "../../assets/icon_castle.svg";
import buildingImage from "../../assets/icon_building.svg";
import { IPriceData } from "model/Map";
import { CENTER_POINTS } from "../../consts/map";

interface IMyPageProps {}

const PriceData: IPriceData[] = [
  { image: flagImage, name: "땅", multiplier: 1.0, id: 0 },
  { image: houseImage, name: "주택", multiplier: 1.2, id: 1 },
  { image: buildingImage, name: "빌딩", multiplier: 1.4, id: 2 },
  { image: castleImage, name: "궁전", multiplier: 1.6, id: 4 },
  { image: towerImage, name: "랜드마크", multiplier: 1.8, id: 8 },
];

interface IArea {
  id: number;
  user_id: number;
  price: number;
  building: number; // 1,2,4,8
}

// {
//   dongNumber: 626,
//   address: "대구 중구 문화동 12-23",
//   guName: "중구",
//   dongName: "문화동",
//   lat: 35.87093418506788,
//   lng: 128.59713759757167,
// },

const Mypage = ({}: IMyPageProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<{ point: number; areas: IArea[] }>();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleClickCancelBtn = () => {
    navigate(-1);
  };

  const handleClickPoint = () => {
    navigate("/mypage/point");
  };

  const handleClickBadge = () => {
    navigate("/mypage/badge");
  };

  // /users/{userId}/profile
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setIsFetching(true);
        const response = await getApi<IUserProfileData>({
          url: `users/${user.id}/profile`,
        });
        if (response) {
          setData({ point: response.point, areas: response.areas });
        }
      } catch (e) {
        alert("프로필 불러오기 실패");
      } finally {
        setIsFetching(false);
      }
    };
    getUserProfile();
  }, []);

  const areas = data?.areas ?? [];
  const point = data?.point ?? 0;

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <MapContainer>
          <CustomNav
            hideShadow
            leftComponent={
              <Flex type="horizontalCenter" className="gap-3">
                <IconButton>
                  <IoPersonCircleOutline size="24" />
                </IconButton>
                마이페이지
              </Flex>
            }
            rightComponent={
              <IconButton onClick={() => handleClickCancelBtn()}>
                <IoClose size="24"></IoClose>
              </IconButton>
            }
          />
          <MainContainer>
            <Flex type="horizontal" className="gap-4 px-2">
              <ImgRounded src={user.imageUrl} />
              <Flex type="verticalLeft">
                <p className="text-lg">{user.name}님 👑</p>
                <p className="text-sm flex items-center text-gray-400 cursor-pointer hover:underline">
                  기본 정보 보기 {">"}
                </p>
              </Flex>
            </Flex>
            <Flex
              onClick={handleClickPoint}
              type="verticalLeft"
              className="p-4 rounded-2xl bg-gray-200 cursor-pointer"
            >
              <Flex type="horizontalCenter" className="text-gray-400">
                내 포인트 | 적립내역 {">"}
              </Flex>
              <p className="text-[36px]">{point} POINT</p>
              {/* <p className="text-[36px]">{data.point} POINT</p> */}
            </Flex>

            {/* divider */}
            <div className="h-[1px] w-full bg-gray-200 my-2"></div>

            <Flex type="verticalLeft" className="">
              <p className="font-bold text-xl">나의 건물</p>
              <Slider
                datas={areas.map((area) => (
                  <Flex
                    type="verticalCenter"
                    className="gap-3 flex-shrink-0 !w-[175px]"
                  >
                    <ImgSquare
                      src={
                        PriceData.find((dong) => dong.id === area.building)
                          ?.image
                      }
                      radius="10"
                      size="lg"
                    />
                    <p className="text-lg font-bold leading-none">
                      {
                        CENTER_POINTS.find(
                          (point) => point.dongNumber === area.id
                        )?.dongName
                      }
                    </p>
                    <p className="text-base font-light leading-none">
                      {PriceData.find((dong) => dong.id === area.building)!
                        .multiplier * area.price}
                      Point
                    </p>
                  </Flex>
                ))}
              ></Slider>
            </Flex>

            {/* divider */}
            <div className="h-[1px] w-full bg-gray-200 my-2"></div>

            <Flex type="verticalLeft" className="">
              <ul className="w-full flex flex-col">
                <li
                  onClick={handleClickBadge}
                  className="w-full flex items-center justify-between font-bold cursor-pointer py-1 hover:bg-gray-200"
                >
                  <span>나의 뱃지 획득</span>
                  <IoChevronForwardSharp size="24" color="gray" />
                </li>
                <li className="w-full flex items-center justify-between font-bold cursor-pointer py-1 hover:bg-gray-200">
                  <span>동별 포인트</span>
                  <IoChevronForwardSharp size="24" color="gray" />
                </li>
                <li className="w-full flex items-center justify-between font-bold cursor-pointer py-1 hover:bg-gray-200">
                  <span>App 설정</span>
                  <IoChevronForwardSharp size="24" color="gray" />
                </li>
              </ul>
            </Flex>

            {/* divider */}
            <div className="h-[1px] w-full bg-gray-200 my-2"></div>

            <Flex type="verticalLeft">
              <ul className="w-full flex flex-col">
                <li className="w-full flex items-center justify-between font-bold cursor-pointer py-1 hover:bg-gray-200">
                  <span>고객센터</span>
                  <IoChevronForwardSharp size="24" color="gray" />
                </li>
                <li className="w-full flex items-center justify-between font-bold cursor-pointer py-1 hover:bg-gray-200">
                  <span>Developers</span>
                  <IoChevronForwardSharp size="24" color="gray" />
                </li>
              </ul>
            </Flex>
          </MainContainer>
        </MapContainer>
      )}
    </>
  );
};

const MapContainer = styled.div`
  padding-top: 50px;
`;

const MainContainer = styled.main`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
`;

export default Mypage;
