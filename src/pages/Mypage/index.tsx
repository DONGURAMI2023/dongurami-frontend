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

interface IMyPageProps {}

const Mypage = ({}: IMyPageProps) => {
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

  return (
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
          <p className="text-[36px]">{user.point} POINT</p>
        </Flex>

        {/* divider */}
        <div className="h-[1px] w-full bg-gray-200 my-2"></div>

        <Flex type="verticalLeft" className="">
          <p className="font-bold text-xl">나의 건물</p>
          <Slider
            datas={[
              <Flex
                type="verticalCenter"
                className="gap-3 flex-shrink-0 !w-[175px]"
              >
                <ImgSquare
                  src={
                    "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
                  }
                  radius="10"
                  size="lg"
                />
                <p className="text-lg font-bold leading-none">
                  중구 성내동 랜드마크
                </p>
                <p className="text-base font-light leading-none">500 POINT</p>
              </Flex>,
              <Flex
                type="verticalCenter"
                className="gap-3 flex-shrink-0 !w-[175px]"
              >
                <ImgSquare
                  src={
                    "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
                  }
                  radius="10"
                  size="lg"
                />
                <p className="text-lg font-bold leading-none">
                  중구 성내동 랜드마크
                </p>
                <p className="text-base font-light leading-none">500 POINT</p>
              </Flex>,
              <Flex
                type="verticalCenter"
                className="gap-3 flex-shrink-0 !w-[175px]"
              >
                <ImgSquare
                  src={
                    "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
                  }
                  radius="10"
                  size="lg"
                />
                <p className="text-lg font-bold leading-none">
                  중구 성내동 랜드마크
                </p>
                <p className="text-base font-light leading-none">500 POINT</p>
              </Flex>,
              <Flex
                type="verticalCenter"
                className="gap-3 flex-shrink-0 !w-[175px]"
              >
                <ImgSquare
                  src={
                    "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
                  }
                  radius="10"
                  size="lg"
                />
                <p className="text-lg font-bold leading-none">
                  중구 성내동 랜드마크
                </p>
                <p className="text-base font-light leading-none">500 POINT</p>
              </Flex>,
              <Flex
                type="verticalCenter"
                className="gap-3 flex-shrink-0 !w-[175px]"
              >
                <ImgSquare
                  src={
                    "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
                  }
                  radius="10"
                  size="lg"
                />
                <p className="text-lg font-bold leading-none">
                  중구 성내동 랜드마크
                </p>
                <p className="text-base font-light leading-none">500 POINT</p>
              </Flex>,
              <Flex
                type="verticalCenter"
                className="gap-3 flex-shrink-0 !w-[175px]"
              >
                <ImgSquare
                  src={
                    "https://media.licdn.com/dms/image/D4D03AQF54ZBQBxQFmw/profile-displayphoto-shrink_100_100/0/1691425036898?e=1704931200&v=beta&t=0mAikxLqpBM6a8kqitQ-wNW9WXMMB8RnFdPvlTZkO4M"
                  }
                  radius="10"
                  size="lg"
                />
                <p className="text-lg font-bold leading-none">
                  중구 성내동 랜드마크
                </p>
                <p className="text-base font-light leading-none">500 POINT</p>
              </Flex>,
            ]}
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
