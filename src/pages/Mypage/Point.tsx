import React from "react";
import styled from "styled-components";
import CustomNav from "components/CustomNav";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const mockData = [
  { 중구: 900 },
  { 서구: 800 },
  { 남구: 800 },
  { 북구: 800 },
  { 달서구: 800 },
  { 수성구: 800 },
];

const Point = () => {
  const navigate = useNavigate();

  const handleClickCancelBtn = () => {
    navigate(-1);
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
            <SubTitle>1000 POINT</SubTitle>
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
  );
};

const MapContainer = styled.div`
  padding-top: 50px;
`;

const MainContainer = styled.main`
  padding: 1.5rem;
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
      border-bottom: 1px solid grey;
      display: flex;
      justify-content: space-between;
      div {
        width: 100%;
        height: 100%;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export default Point;
