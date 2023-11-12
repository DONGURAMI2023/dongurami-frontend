import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomNav from "components/CustomNav";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "pages/Store/userState";
import { getApi } from "utils/http";
import Loading from "components/Loading";
// import { CENTER_POINTS } from "../../consts/map";

const mockData = [
  { 중구: 900 },
  { 서구: 800 },
  { 남구: 50 },
  { 북구: 1700 },
  { 달서구: 500 },
  { 수성구: 100 },
];

interface IAreaData {
  id: number;
  price: number;
  building: number;
  user: number;
}

interface IResultData {
  id: number;
  area_id: number;
  user_id: number;
  created_at: string;
  gain: number;
  total: number;
  reason: string;
  areas: IAreaData[];
}

interface IPointData {
  message: string;
  result: IResultData[];
}

interface IData {
  areas: IAreaData[];
  gain: number;
}

const Point = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  // const [data, setData] = useState<{ gain: number[]; areas: IData[] }>();
  const [temp, setTemp] = useState<IResultData[]>([]);
  const [totalGain, setTotalGain] = useState<number>(0);

  useEffect(() => {
    const getPoint = async () => {
      try {
        setIsFetching(true);
        const response = await getApi<IPointData>({
          url: `users/${user.id}/point`,
        });
        if (response) {
          setTemp(response.result);
          const total = response.result.reduce(
            (sum, item) => sum + item.gain,
            0
          );
          setTotalGain(total);
        }
      } catch (e) {
        alert("프로필 불러오기 실패");
      } finally {
        setIsFetching(false);
      }
    };
    getPoint();
  }, []);

  const handleClickCancelBtn = () => {
    navigate(-1);
  };

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
                내 포인트
              </Flex>
            }
            rightComponent={
              <IconButton onClick={() => handleClickCancelBtn()}>
                <IoClose size="24"></IoClose>
              </IconButton>
            }
          />
          <MainContainer>
            <MainWrapper>
              <PointContainer>
                <MainTitle>포인트</MainTitle>
                <SubTitle>{totalGain} POINT</SubTitle>
              </PointContainer>
              <SpecificContainer>
                <ul>
                  {mockData.map((data, index) => (
                    <li key={index}>
                      <div>{Object.keys(data) + " :"}</div>
                      <div>{Object.values(data) + " point"}</div>
                    </li>
                  ))}
                </ul>
              </SpecificContainer>
            </MainWrapper>
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  background-color: #f4f3f2da;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const PointContainer = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 10px;
  margin: 20px auto;

  width: 80%;
  height: 120px;
  padding: 20px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
`;

const SpecificContainer = styled.div`
  margin-top: 30px;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    li {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      border-bottom: 1px solid lightgrey;
      display: flex;
      justify-content: center;
      div {
        width: 80%;
        height: 100%;
        font-size: 1.2rem;
        display: flex;
        &:first-child {
          justify-content: flex-start;
        }

        &:last-child {
          justify-content: flex-end;
        }
        align-items: center;
      }
    }
  }
`;

export default Point;
